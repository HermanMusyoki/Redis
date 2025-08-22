const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});


client.on("error", (error) => console.log("Redis client error occured!", error)
);

async function testAdditionalFeatures() {
    try{
        await client.connect();

        const subscriber = client.duplicate(); //create a new client -> shares the same connection
        await subscriber.connect();

        await subscriber.subscribe('Solo-channel', (message, channel) => {
            console.log(`Received message from ${channel} : ${message}`)
        })

        await client.publish('Solo-channel', 'Test message from publisher');
        await client.publish('Solo-channel', 'Second message from publisher');

        await new Promise((resolve ) => setTimeout(resolve, 1000));

        await subscriber.unsubscribe('Solo-channel')
        await subscriber.quit()
        

    } catch(error) {
        console.error(error);
    } finally {
        await client.quit()
    }
}

testAdditionalFeatures()