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

        //sets -> SADD, SMEMBERS, SISMEMBER, SREM
        await client.sAdd("user:nickName", ["solomon", "solo", "xyz"]);
        const extractuserNicknames = await client.sMembers("user:nickName");
        console.log(extractuserNicknames);

        await client.sRem("user:nickName", "xyz");

        const getUpdatedUserNickNames = await client.sMembers("user:nickName");
        console.log(getUpdatedUserNickNames)

        //sorted sets ZADD, ZRANGE, ZRANK, ZREM
        await client.zAdd('cart', [
            {
                score : 100, value : 'Cart 1'
            },
            {
                score : 150, value : 'Cart 2'
            },
            {
                score : 90, value : 'Cart 3'
            }
        ]);
        const getCartItems = await client.zRange("cart", 0, -1);
        console.log(getCartItems);

        const getCartItemsWithScores = await client.zRangeWithScores("cart", 0, -1)

        const cartTworank = await client.zRank("cart", "Cart 2")

    } catch(error) {
        console.error(error);
    } finally {
        client.quit();
    }
}


redisDataStructures();