
import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL
});
(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
})();

export default client;