const Discord = require("discord.js")

module.exports = {
    name: 'set-name',
    description: 'Alterar nome do bot',
    options: [
        {
            name: 'nome',
            description: 'Digite um nome',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (Client, interaction) => {
        const nome_bot = interaction.options.getString("nome")

        if (interaction.user.id != "580426757501353995") {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`Parece que você não tem permissão para usar este comando`)
                        .setColor("2f3136")
                        .setTimestamp()
                ],
                ephemeral: true,
            })
        } else {

            interaction.reply({
                ephemeral: true,
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("2f3136")
                        .setDescription(`**${interaction.user.tag},** Alterei o meu nome para:`)
                        .addFields(
                            {
                                name: `\\🌟 Nome alterado para:`,
                                value: `\`\`\`fix\n${nome_bot}\n\`\`\``,
                            },
                        )
                        .setTimestamp()
                        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
                ]
            })
            interaction.Client.user.setUsername(nome_bot)
        }
    }
}