const { ShardingManager } = require('discord.js');



let manager = new ShardingManager('./index.js', {
    token: "ODg3OTQzMjgzNTU1MzMyMTE3.Gl49bN.C0ofy7PBLPDkD0r1P9gn36POmTX0w9Wvs1z6Nw",
    totalShards: "auto",
});

manager.on('shardCreate', shard => {
    console.log(`[SHARDS]: Launched shard ${shard.id}`)
});

manager.spawn();