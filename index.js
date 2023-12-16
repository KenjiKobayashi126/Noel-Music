
//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
//const { Database } = require('quickmongo');
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const keepAlive = require('./server')
require("dotenv");
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  shards: "auto",
  shardCount: 2,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//Client variables to use everywhere
client.voteSkipData = new Map();
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
//client.data = new Database("mongodb+srv://kenjimongo:Discordbot@cluster0.evxiooe.mongodb.net/rythm?retryWrites=true&w=majority")

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
  try {
    require(`./handlers/${handler}`)(client);
  } catch (e) {
    console.log(e)
  }
});
["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  try {
    require(`./handlers/lavalink/${handler}`)(client);
  } catch (e) {
    console.log(e)
  }
});
//login into the bot
client.login(require("./botconfig/config.json").token);


const Enmap = require("enmap")
client.settings = new Enmap({ name: "settings", dataDir: "./database/settings" })

keepAlive();

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
})
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});