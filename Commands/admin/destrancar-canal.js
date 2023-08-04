const Discord = require("discord.js")
module.exports = {
    name: "unlock",
    description: "Abra um canal.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (Client, interaction) => {
        if (!interaction.member.permissions.has("ManageChannels")) {
            interaction.reply(`Parece que você não tem permissão para usar este comando`)
        } else {
            let destrancar = new Discord.EmbedBuilder()
                .setTitle("👦🏻 Canal destrancado!")
                .addFields({ name: `Esse canal foi destrancado, agora todos poderão digitar novamente.`, value: `__*🔓 Destrancado por: ${interaction.user}*__` })
                .setColor('2f3136')
            interaction.reply({ embeds: [destrancar] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(e => {
                    console.log(e)

                    msg.edit(`Ops, algo deu errado ao tentar destrancar este chat.`)
                })
            })

        }
    }
}