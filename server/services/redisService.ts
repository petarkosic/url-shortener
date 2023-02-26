import { createClient } from 'redis';
import { config } from 'dotenv';
config();

export type RedisClient = ReturnType<typeof createClient>;

let _client: RedisClient;

export async function initializeRedis() {
	try {
		const client = createClient({
			url: process.env.REDIS_URL,
		});

		client.on('error', (err) => {
			console.log('Redis Client Error', err);
		});

		await client.connect();
		console.log('Redis Client Connected');
		_client = client;
	} catch (error) {
		console.error(error);
	}
}

export function getRedisClient(): RedisClient {
	if (_client == undefined) {
		throw new Error('Redis is not ready');
	}

	return _client;
}
