const Discord = require("discord.js")

module.exports = {
  name: "ping", 
  description: "Veja o ping do bot.", 
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (Client, interaction) => {

    let ping = Client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: Client.user.username, iconURL: Client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("2f3136");

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: Client.user.username, iconURL: Client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
    .setColor("2f3136");

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}