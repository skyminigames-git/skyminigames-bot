const Discord = require("discord.js")
module.exports = {
    name: "lock",
    description: "Tranque um canal",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (Client, interaction, args) => {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            interaction.reply(`Parece que você não tem permissão para usar este comando`)
        } else {
            let embed = new Discord.EmbedBuilder()
                .setTitle("👦🏻 Canal Trancado!")
                .setColor('2f3136')
                .addFields({name: `Esse canal foi trancado, agora somente Administradores podem digitar`, value: `__*🔒 Trancado por: ${interaction.user}*__`})
                interaction.reply({ embeds: [embed] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    interaction.editReply(`Ops, algo deu errado ao tentar trancar este canal.`)
                })
            })
        }
    }    
}