const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

//event listener

client.on("error", (error) => console.log("Redis client error occured!", error)
);

async function testRedisConnection(){
    try{
        await client.connect();
        console.log("Connected to redis");

        await client.set("key", "solomon");

        const extractValue = await client.get("key");

        console.log(extractValue)

    } catch(error) {
        console.error(error);

    } finally {
        await client.quit()
    }
}

testRedisConnection();