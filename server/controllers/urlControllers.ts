import { Request, Response, NextFunction } from 'express';
import { initializeRedis, getRedisClient } from './../services/redisService';
import { isUri } from 'valid-url';
import { generateHash } from '../generateHash';

let redis: ReturnType<typeof getRedisClient>;

async function runRedis() {
	await initializeRedis();
	redis = getRedisClient();
}
runRedis();

export const getInput = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { longUrl } = req.body;
	const isValidUri = isUri(longUrl);

	if (!isValidUri) {
		return res.status(400).json({ message: 'Invalid URL' });
	}
	let hashValue: string = generateHash();
	let redirectString: string = `http:\/\/localhost:5000/api/${hashValue}`;
	// let redirectString: string = `${req.hostname}/${hashValue}`;

	const getHashValueFromUrl = await redis.get(longUrl);

	if (getHashValueFromUrl !== null) {
		const getLongValueFromHashString = await redis.get(getHashValueFromUrl);
		res.status(200).json({
			hashValue: getHashValueFromUrl,
			originalUrl: getLongValueFromHashString,
		});
	} else {
		await redis.set(longUrl, redirectString);
		await redis.set(redirectString, longUrl);

		const getHashValueFromUrl = await redis.get(longUrl);
		const getLongValueFromHashString = await redis.get(redirectString);

		res.status(200).json({
			hashValue: getHashValueFromUrl,
			originalUrl: getLongValueFromHashString,
		});
	}
};

export const redirectRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	console.log({ id });

	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	const isValidUri = isUri(fullUrl);

	if (!isValidUri) {
		return res.status(400).json({ message: 'Invalid URL' });
	}

	const getHashValueFromUrl = await redis.get(fullUrl);

	if (getHashValueFromUrl !== null) {
		res.redirect(`${getHashValueFromUrl}`);
	}
};
