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

	const input = await redis.get(longUrl as string);

	if (input) {
		res.status(200).json({ input });
	} else {
		let hashValue: string = generateHash();
		let redirectString: string = `http:\/\/localhost:5000/${hashValue}`;

		await redis.set(longUrl, redirectString);
		await redis.set(redirectString, longUrl);

		const getHashValueFromUrl = await redis.get(longUrl);
		const getLongValueFromHashString = await redis.get(redirectString);

		res.status(200).json({ getHashValueFromUrl, getLongValueFromHashString });
	}
};
