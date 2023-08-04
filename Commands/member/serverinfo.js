const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Veja as informações do servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "Cole o ID do servidor",
            type: Discord.ApplicationCommandOptionType.String,
            require: true,
        }
    ],
    run: async (Client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let entrou = interaction.guild.joinedTimestamp;
        let servidor = interaction.guild;
        let donoid = interaction.guild.ownerId;
        let emojis = interaction.guild.emojis.cache.size;
        let serverid = interaction.options.getString("id")
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");


        let ryan = new Discord.EmbedBuilder()
            .setColor("2f3136")
            .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`Informações do servidor: ${interaction.guild}`)
            .addFields(
                {
                    name: `🆔 Identidade`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `ℹ Canais em geral:`,
                    value: `🍁 Canais: ${canais}\n🍁 Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `👨🏻 Usuarios`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `📅 Servidor criado`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `🚀 ${interaction.user.username} entrou em `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `🏆 Dono`,
                    value: `<@!${donoid}> \n\`\`${donoid}\`\``,
                    inline: true,
                }
        )
        
        
        
        
        interaction.reply({ ephemeral: true, embeds: [ryan] })
    }
}