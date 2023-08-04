require('../bot')

const Discord = require('discord.js')
const client = require('../bot')

client.on("ready", () => {
    client.user.setPresence({
        activities: [{ name: `Junte-se a nossa comunidade do discord!`, type: Discord.ActivityType.Playing }],
        status: "online",
    });
    console.log(`${client.user.username} está online!`);
});