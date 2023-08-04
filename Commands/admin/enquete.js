const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "enquete",
  description: "Crie uma enquete",
  options: [
    {
      name: "conteudo",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Qual será a enquete",
      required: true,
    },
    {
      name: "tempo",
      type: Discord.ApplicationCommandOptionType.String,
      description: "escolha o tempo do sorteio",
      required: true,
      choices: [
        {
            name: "5 Segundos",
            value: "5s",
          },
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "12 Horas",
          value: "12h",
        },
        {
          name: "1 Dia",
          value: "24h",
        },
        {
          name: "3 dias",
          value: "72h",
        },
        {
          name: "1 Semana",
          value: "168h",
        },
      ],
    },
  ],

  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        content: `Parece que você não tem permissão para usar este comando`,
        ephemeral: true,
      });
    } else {
      let premio = interaction.options.getString("conteudo");
      let tempo = interaction.options.getString("tempo");

      let duracao = ms(tempo);

      const button = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId('sim')
            .setLabel('Sim')
            .setStyle('3'),
            new Discord.ButtonBuilder()
            .setCustomId('nao')
            .setLabel('Não')
            .setStyle('4')
        );

      let click = [];
      let click2 = [];
      let contador = 0;
      let contador2 = 0;

      let erro = new Discord.EmbedBuilder()
        .setColor("#FA0A01")
        .setDescription(`Não foi possível iniciar a enquete!`);

      const msg = await client.channels.cache
        .get("1136750073347330208")
        .send({
          content: `${premio}`,
          components: [button],
        })
        .catch((e) => {
          interaction.reply({ embeds: [erro] });
        });

      const coletor = msg.createMessageComponentCollector({
        time: duracao,
      });

      const coletor2 = msg.createMessageComponentCollector({
        time: duracao,
      });

      coletor.on("end", (i) => {
        
      });

      coletor2.on("end", (i) => {
        
      });

      coletor.on("collect", (i) => {
        if (i.customId === "sim") {
          if (click.includes(i.user.id)) {
            return i.reply({
              content: `Você já votou na enquete antes!`,
              ephemeral: true,
            });
          }

          click.push(i.user.id);
          contador++;

          i.reply({
            content: `Olá jogador!\nAgora você está participando na enquete,\nObrigado por contribuir na melhora da nossa rede com sua opinião!`,
            ephemeral: true,
          });
        }
      });

      coletor2.on("collect", (i) => {
        if (i.customId === "nao") {
          if (click2.includes(i.user.id)) {
            return i.reply({
              content: `Você já votou na enquete antes!`,
              ephemeral: true,
            });
          }

          click2.push(i.user.id);
          contador2++;

          i.reply({
            content: `Olá jogador!\nAgora você está participando na enquete,\nObrigado por contribuir na melhora da nossa rede com sua opinião!`,
            ephemeral: true,
          });
        }
      });

      setTimeout(() => {
        let embedganhador = new Discord.EmbedBuilder()
          .setTitle('Finalização da Enquete')
          .setDescription(`Numeração final de Sim: ${contador}\n\nNumeração final de Não: ${contador2}`)
          .setColor("#FAEC00");
        client.channels.cache
          .get("1136750073347330208")
          .send({ embeds: [embedganhador] });
      }, duracao);
    }
  },
};
