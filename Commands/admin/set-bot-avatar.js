const Discord = require("discord.js")

module.exports = {
    name: 'set-avatar',
    description: 'Alterar avatar do bot',
    options: [
        {
            name: 'imagem',
            description: 'Selecione um avatar',
            type: Discord.ApplicationCommandOptionType.Attachment, //Discord.ApplicationCommandOptionType.String, //caso queria colocar por URL
            required: true
        },
    ],

    run: async (Client, interaction) => {
        const avatar_bot = interaction.options.getAttachment("imagem") //const avatar_bot = interaction.options.getAString("imagem") //caso queria colocar por URL

        if (interaction.user.id != "580426757501353995") {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setDescription(`Parece que você não tem permissão para usar este comando`)
                    .setImage(avatar_bot.url) //remova o .url caso queria por URL
                    .setColor("2f3136")
                    .setTimestamp()
                ],
                ephemeral: true,
            })
        }

        interaction.reply({
            ephemeral: true,
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("2f3136")
                    .setDescription(`**${interaction.user.tag},** Alterei o meu avatar para:`)
                    .setImage(avatar_bot.url) //remova o .url caso queria por URL
                    .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
            ]
        })
        interaction.Client.user.setAvatar(avatar_bot.url) //remova o .url caso queria por URL
    }
}