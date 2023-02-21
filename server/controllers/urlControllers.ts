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
		res.status(200).json(JSON.parse(input));
	} else {
		await redis.set(
			longUrl as string,
			`http:\/\/localhost:5000/${generateHash()}`
		);
		res.status(200).json(JSON.parse(longUrl));
	}
	next();

	// get the long url
	// check if in redis
	// if yes, return the short url
	// if no, generate a new short url
	// store the short url in redis
	// return the short url
	// redis.set('aaaaa', 'b2');
	// const getValue = await redis.get('a');
	// console.log(getValue);

	// res
	// 	.status(200)
	// 	.json({ message: 'Hello from api router', redisValue: getValue });
	// return '';
};
