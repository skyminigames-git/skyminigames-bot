const Discord = require("discord.js")

module.exports = {
    name: 'kiss',
    description: 'Beije um user',
    options: [
        {
            name: 'user',
            description: 'Selecione um usuário',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (Client, interaction, args) => {
        let usuario = interaction.options.getUser('usuário') || interaction.user;

        var lista1 = [
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif'
        ];
        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ];
        var r1 = lista1[Math.floor(Math.random() * lista1.length)];
        var r2 = lista2[Math.floor(Math.random() * lista2.length)];

        let userr = interaction.options.getUser("user");
        let user = interaction.guild.members.cache.get(userr.id)

        let embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um beijo em ${user}.**`)
            .setImage(`${r1}`)
            .setColor('2F3136')
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }), })

            let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setCustomId("1")
                .setLabel("Retribuir")
                .setStyle(Discord.ButtonStyle.Primary)
            );
            let embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Retribuiu o beijo de ${interaction.user}.**`)
            .setImage(`${r2}`)
            .setColor('2F3136')
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }), })
           
            interaction.reply({ embeds: [embed], components: [botao] }).then(() => {
                const filter = i => i.customId === '1' && i.user.id === user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });
    
                collector.on('collect', async i => {
                    if (i.customId === '1') {
                        i.reply({ embeds: [embed1] })
                    }
                });
            })
    }
}