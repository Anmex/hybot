const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
});

const { token } = require('./config.json');
const commandHandler = require('./commands');

console.log(
    "Starting HyBot v2" +
    "\nNode version: " + process.version +
    "\nDiscord.js version: " + require("discord.js").version
);

client.once("ready", function () {
    console.log("Bot ready! Currently deployed on " + client.guilds.cache.size + " server(s).");
    client.user.setPresence({
        status: "online",
        activities: [{
            name: "Hytale News",
            type: "WATCHING",
        }],
    });
});

client.on("disconnect", function () {
    console.log("Bot disconnected!");
    process.exit(1);
});

client.on('messageCreate', commandHandler);

client.login(token);
