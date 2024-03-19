import { createClient } from 'redis';

const client = createClient();

const connectRedis = async () => {
    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect().then(() => console.log('Redis Connected'));
};

connectRedis();

export default client;