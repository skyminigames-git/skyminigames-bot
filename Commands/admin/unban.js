const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'unban',
    description: 'Desbanir um menbro do servidor',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Mencione um usuário.',
            required: true,
        },
        {
            name: 'motivo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Digite o motivo.',
            required: false,
        }
    ],
    run: async (Client, interaction, options) => {
        let user = interaction.options.getUser("usuário");
        let motivo = interaction.options.getString("motivo") || `Motivo não informado`;

        let channel = Client.channels.cache.get("1011041793745358949") //id do canal de logs unban

        if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.BanMembers))
            return interaction.reply({
                content: `Parece que você não tem permissão para usar este comando`,
                ephemeral: true,
            })

        if (!interaction.channel.permissionsFor(interaction.Client.user).has(Discord.PermissionFlagsBits.BanMembers))
            return interaction.reply({
                content: `Parece que eu não tenho permissão para fazer isso!`,
                ephemeral: true,
            })

        if (user.id === interaction.user.id) return interaction.reply({
            content: `Você não pode se banir!`,
            ephemeral: true
        })
        if (user.id === Client.user.id) return interaction.reply({
            content: `Você não pode me desbanir, nem estou banido :/`,
            ephemeral: true
        })

        const embedbann = new Discord.EmbedBuilder()
        .setTitle(`Novo Desbanimento:`)
        .setDescription(`**Usuário:** ${user}\n\n`)
        .setColor('2f3136')
       .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })

        let MemberEmbed = new Discord.EmbedBuilder()
        .setTitle(`Novo Desbanimento:`)
        .setDescription(`**Usuário:** ${user}\n\n`)
        .setColor('2f3136')
       .setFooter({ text: `Comando requisitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })

        interaction.guild.members.unban(user, { reason: [motivo] }).then(() => {
            interaction.reply({ embeds: [MemberEmbed] })
            channel.send({ embeds: [embedbann] })
        }).catch(e => {
            interaction.reply({ content: `\\❌ | **Não foi possivel Desbanir ${user}(\`${user.id}\`) do servidor**`, ephemeral: true })
        })
    }
}