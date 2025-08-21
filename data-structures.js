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

        //Lists -> LPUSH, RPUSH, LRANGE, LPOP, RPOP

        await client.lPush("notes", ["note 1", "note 2", "note 3"]);
        const extractAllNotes = await client.lRange("notes", 0, -1);
        console.log(extractAllNotes);

        const firstNote = await client.lPop("notes");
        console.log(firstNote);

        const remainingNotes = await client.lRange("notes", 0, -1);
        console.log(remainingNotes)

    } catch(error) {
        console.error(error);
    } finally {
        client.quit();
    }
}


redisDataStructures();