const Discord = require("discord.js")

module.exports = {
  name: "anunciar", 
  description: "Envie um anuncio de forma personalizada.", 
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
        name: "canal",
        description: "Mencione o canal que  anuncio será enviado",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true
    },
    {
        name: "titulo",
        description: "Escreva um titulo para o anuncio.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "desc",
        description: "Escreva uma descrição para o anuncio.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true  

    },
  ],
  run: async (Client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`Parece que você não tem permissão para usar este comando`);
    } else {

        let canal = interaction.options.getChannel("canal")
        let titulo = interaction.options.getString("titulo")
        let desc = interaction.options.getString("desc")

        let e = new Discord.EmbedBuilder()
        .setColor('2f3136')
        .setTitle(titulo)
        .setFooter({ text: 'Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' })
        .setDescription(desc)
        .setTimestamp()
        .setFooter({ text: Client.user.username, iconURL: Client.user.displayAvatarURL({ dinamyc: true }) })

        canal.send({embeds: [e]})

        interaction.reply({content: `A mensagem foi enviada para ${canal} com sucesso!`, ephemeral: true})

    }
  }}