const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, Client, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "ticketset",
  description: "Define o local da mensagem de ticket",
  type: 1,

  run: async (client, interaction) => {
    if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({
        content: `Parece que você não tem permissão para usar este comando`,
        ephemeral: true,
      });
    }

    const embedSuporte = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Central de Ajuda da SkyMinigames')
      .setDescription(`Aqui, estamos prontos para ajudá-lo(a) a esclarecer suas dúvidas e resolver eventuais problemas. Sinta-se à vontade para entrar em contato com a nossa equipe por meio das opções disponíveis abaixo.\n\nLembre-se de fornecer informações detalhadas sobre o problema que está enfrentando para que possamos oferecer a melhor assistência possível.`)
      .setThumbnail('https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png')
      .setImage('https://media.discordapp.net/attachments/1135281516121952306/1135985395654463548/mini_binho.png?width=1246&height=701')
      .setTimestamp()
      .setFooter({ text: 'Suporte Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' });
    
    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket')
      .setPlaceholder('Selecione uma opção')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(' - Tirar dúvidas')
          .setValue('duvida')
          .setEmoji('☎'),
        new StringSelectMenuOptionBuilder()
          .setLabel(' - Fazer denúncia')
          .setValue('denuncia')
          .setEmoji('🚨'),
        new StringSelectMenuOptionBuilder()
          .setLabel(' - Apelar uma punição')
          .setValue('appeal')
          .setEmoji('⚖️'),
        new StringSelectMenuOptionBuilder()
          .setLabel(' - Solicitar Tag')
          .setValue('solicitartag')
          .setEmoji('📼'),
      );

    const row = new ActionRowBuilder()
      .addComponents(select);

      try {
        const channel = interaction.channel;
        const message = await channel.send({ embeds: [embedSuporte], components: [row]});
  
        const filter = (interaction) => interaction.customId === 'ticket' && interaction.user.id === interaction.member.id;
        const collector = message.createMessageComponentCollector({ filter, time: 60000 });
  
        collector.on('collect', (collected) => {
          // Aqui você pode tratar a escolha feita pelo usuário (collected.values[0])
  
          // Remove o componente (a seleção) da mensagem
          row.components = row.components.map(component => {
            if (component.customId === 'ticket') {
              component.setDisabled(true); // Opcional: você pode desabilitar o menu em vez de removê-lo completamente.
            }
            return component;
          });
  
          // Atualiza a mensagem com o componente (a seleção) removida
          message.edit({ embeds: [embedSuporte], components: [row] });
  
          // A partir daqui, você pode executar outras ações com base na escolha do usuário
        });
  
        collector.on('end', (collected, reason) => {
          if (reason === 'time') {
            // Aqui você pode lidar com o caso em que o tempo limite do collector é atingido
            // Por exemplo, removendo a seleção após um tempo limite sem resposta do usuário
            row.components = row.components.map(component => {
              if (component.customId === 'ticket') {
                component.setDisabled(true); // Opcional: você pode desabilitar o menu em vez de removê-lo completamente.
              }
              return component;
            });
            message.edit({ embeds: [embedSuporte], components: [row] });
          }
        });
      } catch (error) {
        console.log('Erro ocorreu ao executar o comando:', error);
      }
    },
  };
