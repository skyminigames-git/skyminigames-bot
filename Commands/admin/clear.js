const Discord = require("discord.js")

module.exports = {
    name: "clear", 
    description: "Limpe as mensagens do canal de texto", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'numero',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],




    run: async (Client, interaction) => {

        let numero = interaction.options.getNumber('numero')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Parece que você não tem permissão para usar este comando`, ephemeral: true })
        } else {

            if(!interaction.guild.members.me.permissions.has("ManageMessages"))
            return interaction.reply("Parece que estou sem permissões suficientes!");

            if (parseInt(numero) > 100 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("#2f3136")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                const botcor = interaction.guild.members.cache.get(Client.user.id)

                let embed = new Discord.EmbedBuilder()
                     .setColor("#2f3136")
                    .setAuthor({ name: `Limpeza concluida com sucesso`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setImage("https://cdn.discordapp.com/attachments/935398454388224000/1030504754838782013/standard_4.gif")
                    .setDescription(`O chat ${interaction.channel} teve **${numero}** mensagens apagadas por **${interaction.user.username}**.`);

                interaction.reply({ ephemeral: true, embeds: [embed] })
                
                setTimeout(() => {
                    interaction.deleteReply()
                }, 5000)

              

            }

        }

    }
}