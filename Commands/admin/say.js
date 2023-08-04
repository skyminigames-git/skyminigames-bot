const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require("discord.js")
const ms = require('ms')
module.exports = {
  name: "say", 
  description: "Mande uma mensagem", 
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      description: "Escolha o canal para que a mensagem seja enviada",
      required: true,
      type: ApplicationCommandOptionType.Channel
    },
    {
      name: "titulo",
      description: "Escreva o titulo",
      required: true,
      type: ApplicationCommandOptionType.String
    },
    {
      name: "mensagem",
      description: "Escreva a mensagem",
      required: true,
      type: ApplicationCommandOptionType.String
    },
  ],
  run: async (Client, interaction) => {

    if (
      !interaction.member.permissions.has(
        PermissionFlagsBits.ManageChannels
      )
    )
      return interaction.reply({
        content: `Parece que você não tem permissão para usar este comando`,
        ephemeral: true,
      });

    let canal = interaction.options.getChannel("canal")
    let titulo = interaction.options.getString("titulo") || " "
    let mensagem = interaction.options.getString("mensagem") || " "

    const exampleEmbed = new EmbedBuilder()
      .setTitle(`${titulo}`)
      .setDescription(`${mensagem}`)
      .setColor(`2f3136`)

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('sim')
          .setLabel('Sim')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('nao')
          .setLabel('Não')
          .setStyle(ButtonStyle.Danger)
      );




    interaction.reply({ content: 'Tem certeza que deseja enviar o embed?\n **Preview**:', embeds: [exampleEmbed], components: [row], ephemeral: true }).then(() => {

      Client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId === "sim") { interaction.reply({ content: `Embed enviado com sucesso ${canal}`, ephemeral: true }), canal.send({ embeds: [exampleEmbed] }) }
      }); Client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId === "nao") {
          interaction.reply({ content: `Embed cancelado com sucesso`, ephemeral: true })
        }

      });





    })
  }
}

