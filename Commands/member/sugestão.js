const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "sugestão",
  description: "Nos envie uma sugestão",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "sugestão",
      description: "Digite sobre a sugestão",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (bot, interaction) => {
    const sugestão = interaction.options.getString("sugestão");
      const user = interaction.user;
      
      const embed = new EmbedBuilder()
        .setColor("#00FF1A")
        .setTitle(`💡 |  Nova Sugestão!`)
        .setDescription(`O usuario ${user} enviou uma sugestão!: \`${sugestão}\``)
      try {
        await bot.channels.cache
          .get("")// coloque o Id do canal para onde será enviado o bug.
          .send({ embeds: [embed] });
        await interaction.reply({
          content: "Sugestão enviada com sucesso!",
          ephemeral: true,
        });
      } catch(error) {
        console.error(error);
        await interaction.reply({
          content:
            "Houve um erro ao enviar sua sugestão. Tente novamente mais tarde.",
          ephemeral: true,
        });
      }
    }
  }