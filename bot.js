const Discord = require("discord.js");
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.GuildMembers,
    ],
    partials: [Discord.Partials.Channel],
});
const config = require("./config.json");

client.slashCommands = new Discord.Collection();
require("./handler")(client);

const fs = require('fs');

fs.readdir('./Events', (err, file) => {
    file.forEach(event => {
        require(`./Events/${event}`)
    })
})

client.login(config.token);

module.exports = client;
