const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

//event listener

client.on("error", (error) => console.log("Redis client error occured!", error)
);


async function redisDataStructures() {
    try{
        await client.connect();
        //Strings -> SET, GET, MSET, MGET
        await client.set("username:", "Solomon Musyoki")
        const name = await client.get("username:");
        console.log(name);

        await client.mSet([
            "user:email", "solomon@gmail.com", 
            "user:age", "26", 
            "user:country", "Kenya"
        ]);
        const [email, age, country] = await client.mGet([
            "user:email", 
            "user:age", 
            "user:country"
        ]);
        console.log(email,age,country)

    } catch(error) {
        console.error(error);
    } finally {
        client.quit();
    }
}


redisDataStructures();