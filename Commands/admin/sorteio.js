const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "sorteio",
    description: "Crie um sorteio",
    options: [
      {
        name: "premio",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Qual será o prêmio?",
        required: true,
      },
      {
        name: "regras",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Descrição do sorteio",
        required: true,
      },
      {
      name: "tempo",
      type: Discord.ApplicationCommandOptionType.String,
      description: "escolha o tempo do sorteio",
      required: true,
      choices: [
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "1 Minuto",
          value: "1m",
        },
        {
          name: "5 Minutos",
          value: "5m",
        },
        {
          name: "10 Minutos",
          value: "10m",
        },
        {
          name: "15 Minutos",
          value: "15m",
        },
        {
          name: "30 Minutos",
          value: "30m",
        },
        {
          name: "45 Minutos",
          value: "45m",
        },
        {
          name: "1 Hora",
          value: "1h",
        },
        {
          name: "2 Horas",
          value: "2h",
        },
        {
          name: "5 Horas",
          value: "5h",
        },
        {
          name: "12 Horas",
          value: "12h",
        },
        {
          name: "24 Horas",
          value: "24h",
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
      let premio = interaction.options.getString("premio");
      let tempo = interaction.options.getString("tempo");
      let desc = interaction.options.getString("regras");

      let duracao = ms(tempo);

      const button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("botao")
          .setEmoji("<:BinhoMuque:1136034730211561473>")
          .setStyle(2)
      );

      let click = [];
      let contador = 0;

      const embed = new Discord.EmbedBuilder()
        .setTitle(`🎉 **Sorteio**`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(
          `- *Prêmio:* **${premio}**\n- *Regras do sorteio:* **${desc}** \n- *Duração:* **${tempo}**\n- *Participantes:* **${contador}**\n\n*Clique no botão abaixo para participar!*`
        )
        .setTimestamp(Date.now() - ms(tempo))
        .setFooter({
          text: "Equipe Sky Minigames",
          iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png',
        })
        .setColor(0x0099FF);

      let erro = new Discord.EmbedBuilder()
        .setColor("#FA0A01")
        .setDescription(`Não foi possível iniciar o sorteio!`);

      const msg = await interaction
        .reply({
          embeds: [embed],
          components: [button],
        })
        .catch((e) => {
          interaction.reply({ embeds: [erro] });
        });

      const coletor = msg.createMessageComponentCollector({
        time: ms(tempo),
      });

      coletor.on("end", (i) => {
        interaction.editReply({
          components: [],
        });
      });

      coletor.on("collect", (i) => {
        if (i.customId === "botao") {
          if (click.includes(i.user.id)) {
            return i.reply({
              content: `❌ *Olá ${interaction.user}, você já está participando do sorteio!*`,
              ephemeral: true,
            });
          }

          click.push(i.user.id);
          contador++;

          embed.setDescription(
            `- *Prêmio:* **${premio}**\n- *Regras do sorteio:* **${desc}** \n- *Duração:* **${tempo}**\n- *Participantes:* **${contador}**\n\n*Clique no botão abaixo para participar!*`
          );
          
          interaction.editReply({
            embeds: [embed],
          });

          i.reply({
            content: `✔ *Você começou a participar do sorteio e começou a concorrer ao ${premio}*`,
            ephemeral: true,
          });
        }
      });

      setTimeout(() => {
        let ganhador = click[Math.floor(Math.random() * click.length)];

        if (click.length == 0) {
          let cancelado = new Discord.EmbedBuilder()
            .setTitle('❌ **Cancelado**')
            .setDescription(`- *O sorteio foi cancelado pois não houve participantes o suficiente*`)
            .setColor("#FF0000");

          return interaction.channel.send({ embeds: [cancelado], content: `@everyone` });
        }

        let embedganhador = new Discord.EmbedBuilder()
          .setTitle('⭐ **Parabéns**')
          .setDescription(`*Parabéns ${interaction.user}, você acaba de ganhar um* **${premio}**`)
          .setColor("#FAEC00")
          .setThumbnail('https://cdn.discordapp.com/attachments/1135281516121952306/1135975853109563512/BINHO_MUQUE2.png');

        interaction.channel.send({ embeds: [embedganhador], content: `${interaction.user}` });
      }, duracao);
    }
  },
};