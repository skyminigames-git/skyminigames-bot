require('../bot')

const Discord = require('discord.js')
const client = require('../bot')
const discordTranscripts = require('discord-html-transcripts');
const { PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, Client } = require('discord.js');

client.on("interactionCreate", async (interaction) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === "ticket") {
        const selectedValue = interaction.values[0];
        if (selectedValue === "duvida") {
            let nome_canal = `☎-${interaction.user.tag}`;
            let canal = interaction.guild.channels.cache.find(ca => ca.name === nome_canal);

            if(canal) {
                interaction.reply({content: `Você já possuí um ticket criado em ${canal}.`, ephemeral: true})
            } else {
            let categoria = interaction.channel.parent;
            if (!categoria) categoria = null;
                
                 interaction.guild.channels.create({
                    name: nome_canal,
                    parent: categoria,
                    type: Discord.ChannelType.GuildText,
                    permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [Discord.PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [Discord.PermissionFlagsBits.ViewChannel,
                        Discord.PermissionFlagsBits.AddReactions,
                        Discord.PermissionFlagsBits.SendMessages,
                        Discord.PermissionFlagsBits.AttachFiles,
                        Discord.PermissionFlagsBits.EmbedLinks],
                    },
                        ]
                    }).then( (chat) => {
                        interaction.reply({ content: `Seu ticket foi aberto em ${chat}`, ephemeral: true})

                        const embedInTicket = new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setTitle('Seja bem-vindo ao suporte')
                            .setDescription(`Estamos aqui para ajudar em tudo o que você precisar. Sinta-se à vontade para nos contatar sempre que tiver alguma dúvida, problema ou necessidade. Nossa equipe está pronta para atendê-lo(a) da melhor forma possível e proporcionar uma experiência incrível.`)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1135281516121952306/1135968179043184790/pre_render_3.png')
                            .setTimestamp()
                            .setFooter({ text: 'Suporte Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' });

                            const select = new StringSelectMenuBuilder()
                                        .setCustomId('inticket')
                                        .setPlaceholder('Selecione uma ação')
                                        .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(' - Fechar Atendimento')
                                        .setEmoji(`🔒`)
                                        .setValue('fechar'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Lock`)
                                        .setEmoji(`🔐`)
                                        .setValue('lock'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Unlock`)
                                        .setEmoji(`🔓`)
                                        .setValue('unlock'),
                                    );

                            const row = new ActionRowBuilder()
                                .addComponents(select);

                            try {
                                chat.send({ content: `<@&1134513089887350814> ${interaction.user}`, embeds: [embedInTicket], components: [row]});
                              } catch (error) {
                                console.log('Erro ocorreu ao enviar mensagem de ticket:', error);
                              }
                    })
                }
            }

            if (selectedValue === "denuncia") {
                let nome_canal = `🚨-${interaction.user.tag}`;
                let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
    
                if(canal) {
                    interaction.reply({content: `Você já possuí um ticket criado em ${canal}.`, ephemeral: true})
                } else {
                let categoria = interaction.channel.parent;
                if (!categoria) categoria = null;
                    
                     interaction.guild.channels.create({
                        name: nome_canal,
                        parent: categoria,
                        type: Discord.ChannelType.GuildText,
                        permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [Discord.PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Discord.PermissionFlagsBits.ViewChannel,
                            Discord.PermissionFlagsBits.AddReactions,
                            Discord.PermissionFlagsBits.SendMessages,
                            Discord.PermissionFlagsBits.AttachFiles,
                            Discord.PermissionFlagsBits.EmbedLinks],
                        },
                            ]
                        }).then( (chat) => {
                            interaction.reply({ content: `Seu ticket foi aberto em ${chat}`, ephemeral: true})
    
                            const embedInTicket = new EmbedBuilder()
                                .setColor(0x0099FF)
                                .setTitle('Seja bem-vindo ao suporte')
                                .setDescription(`Se você deseja denunciar um jogador por violações às regras ou comportamento inadequado, preencha o seguinte modelo e envie-nos para que possamos investigar o caso. Por favor, aguarde até que um membro de nossa equipe analise sua mensagem e tome as devidas providências.

                                1. **Seu apelido/nickname:**\n2. **Apelido/Nickname do jogador reportado:**\n3. **Motivo da denúncia:**\n4. **Provas:**`)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1135281516121952306/1135968179043184790/pre_render_3.png')
                                .setTimestamp()
                                .setFooter({ text: 'Suporte Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' });
    
                                const select = new StringSelectMenuBuilder()
                                        .setCustomId('inticket')
                                        .setPlaceholder('Selecione uma ação')
                                        .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(' - Fechar Atendimento')
                                        .setEmoji(`🔒`)
                                        .setValue('fechar'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Lock`)
                                        .setEmoji(`🔐`)
                                        .setValue('lock'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Unlock`)
                                        .setEmoji(`🔓`)
                                        .setValue('unlock'),
                                    );
    
                                const row = new ActionRowBuilder()
                                    .addComponents(select);
    
                                try {
                                    chat.send({ content: `<@&1134513089887350814> ${interaction.user}`, embeds: [embedInTicket], components: [row]});
                                  } catch (error) {
                                    console.log('Erro ocorreu ao enviar mensagem de ticket:', error);
                                  }
                        })
                    }
                }
                if (selectedValue === "solicitartag") {
                    let nome_canal = `📼-${interaction.user.tag}`;
                    let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
        
                    if(canal) {
                        interaction.reply({content: `Você já possuí um ticket criado em ${canal}.`, ephemeral: true})
                    } else {
                    let categoria = interaction.channel.parent;
                    if (!categoria) categoria = null;
                        
                         interaction.guild.channels.create({
                            name: nome_canal,
                            parent: categoria,
                            type: Discord.ChannelType.GuildText,
                            permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [Discord.PermissionFlagsBits.ViewChannel]
                            },
                            {
                                id: interaction.user.id,
                                allow: [Discord.PermissionFlagsBits.ViewChannel,
                                Discord.PermissionFlagsBits.AddReactions,
                                Discord.PermissionFlagsBits.SendMessages,
                                Discord.PermissionFlagsBits.AttachFiles,
                                Discord.PermissionFlagsBits.EmbedLinks],
                            },
                                ]
                            }).then( (chat) => {
                                interaction.reply({ content: `Seu ticket foi aberto em ${chat}`, ephemeral: true})
        
                                const embedInTicket = new EmbedBuilder()
                                    .setColor(0x0099FF)
                                    .setTitle('Seja bem-vindo ao suporte')
                                    .setDescription(`Para solicitar sua tag desejada, preencha os seguintes campos:

                                    1. **Apelido/Nickname:**\n2. **Tag desejada:**\n3. **Link:** [Caso seja aplicável, informe o link relacionado à sua solicitação]\n\nApós preencher todos os campos acima, envie esta mensagem e aguarde até que um membro da equipe verifique sua solicitação.\n\nAo digitar "/requisitos", o jogador pode obter informações sobre os requisitos para as tags Youtuber ou Streamer, caso tenha interesse em adquiri-las. A equipe ou um membro responsável revisará a solicitação e fornecerá a tag solicitada, desde que esteja de acordo com os critérios estabelecidos.`)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1135281516121952306/1135968179043184790/pre_render_3.png')
                                    .setTimestamp()
                                    .setFooter({ text: 'Suporte Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' });
        
                                    const select = new StringSelectMenuBuilder()
                                        .setCustomId('inticket')
                                        .setPlaceholder('Selecione uma ação')
                                        .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(' - Fechar Atendimento')
                                        .setEmoji(`🔒`)
                                        .setValue('fechar'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Lock`)
                                        .setEmoji(`🔐`)
                                        .setValue('lock'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Unlock`)
                                        .setEmoji(`🔓`)
                                        .setValue('unlock'),
                                    );
        
                                    const row = new ActionRowBuilder()
                                        .addComponents(select);
        
                                    try {
                                        chat.send({ content: `<@&1134513089887350814> ${interaction.user}`, embeds: [embedInTicket], components: [row]});
                                      } catch (error) {
                                        console.log('Erro ocorreu ao enviar mensagem de ticket:', error);
                        }
                    })
                }
                
            }
                if (selectedValue === "appeal") {
                    let nome_canal = `⚖️-${interaction.user.tag}`;
                    let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
        
                    if(canal) {
                        interaction.reply({content: `Você já possuí um ticket criado em ${canal}.`, ephemeral: true})
                    } else {
                    let categoria = interaction.channel.parent;
                    if (!categoria) categoria = null;
                        
                         interaction.guild.channels.create({
                            name: nome_canal,
                            parent: categoria,
                            type: Discord.ChannelType.GuildText,
                            permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [Discord.PermissionFlagsBits.ViewChannel]
                            },
                            {
                                id: interaction.user.id,
                                allow: [Discord.PermissionFlagsBits.ViewChannel,
                                Discord.PermissionFlagsBits.AddReactions,
                                Discord.PermissionFlagsBits.SendMessages,
                                Discord.PermissionFlagsBits.AttachFiles,
                                Discord.PermissionFlagsBits.EmbedLinks],
                            },
                                ]
                            }).then( (chat) => {
                                interaction.reply({ content: `Seu ticket foi aberto em ${chat}`, ephemeral: true})
        
                                const embedInTicket = new EmbedBuilder()
                                    .setColor(0x0099FF)
                                    .setTitle('Seja bem-vindo ao suporte')
                                    .setDescription(`Para solicitar a revisão da sua punição, por favor, preencha os campos abaixo com as informações necessárias:
                                    
                                    1. **Apelido/Nickname:**
                                    2. **Motivo da Punição:**
                                    3. **ID da Punição:**
                                    4. **Print da Tela de Punição:**\n5. **Justificativa para remover a punição:**\n\nEnvie esta mensagem preenchida e aguarde até que um administrador possa analisar o seu caso. Nossa equipe está comprometida em revisar as punições de forma justa e transparente, garantindo um ambiente saudável para todos os jogadores.`)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1135281516121952306/1135968179043184790/pre_render_3.png')
                                    .setTimestamp()
                                    .setFooter({ text: 'Suporte Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' });
        
                                    const select = new StringSelectMenuBuilder()
                                        .setCustomId('inticket')
                                        .setPlaceholder('Selecione uma ação')
                                        .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(' - Fechar Atendimento')
                                        .setEmoji(`🔒`)
                                        .setValue('fechar'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Lock`)
                                        .setEmoji(`🔐`)
                                        .setValue('lock'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel(` - Unlock`)
                                        .setEmoji(`🔓`)
                                        .setValue('unlock'),
                                    );
        
                                    const row = new ActionRowBuilder()
                                        .addComponents(select);
        
                                    try {
                                        chat.send({ content: `<@&1134513089887350814> ${interaction.user}`, embeds: [embedInTicket], components: [row]});
                                      } catch (error) {
                                        console.log('Erro ocorreu ao enviar mensagem de ticket:', error);
                        }
                    })
                }

            }
        }
        if (interaction.isSelectMenu()) {
            if (interaction.customId === "inticket") {
            const channel = interaction.channel;
            const selectedValue = interaction.values[0];
            if(selectedValue === "fechar") {
                let channel = interaction.channel;
                            const attachment = await discordTranscripts.createTranscript(channel, {
                               fileName: `${channel.name}.html`,
                             });
                interaction.channel.members.forEach(member => {
                    if (member.user.id !== client.user.id) {
                        member.user.send({ content: `\`💾 - Transcript ⤵\``, files: [attachment] })
                    }
                });

                const embeddelete = new EmbedBuilder()
                                    .setColor(0x0099FF)
                                    .setTitle('🔐 - Ticket Fechado!')
                                    .setDescription(`Deseja deleta-lo?`)
                                    .setTimestamp()
                                    .setFooter({ text: 'Suporte Sky Minigames', iconURL: 'https://cdn.discordapp.com/attachments/1135281516121952306/1135951334403756032/ea2f9bf8991382ac85b7db7cc5b56a49-removebg-preview.png' });

                let deletar = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel(`Deletar Ticket`)
                    .setCustomId('deletarticket')
                    .setStyle(Discord.ButtonStyle.Danger),
                )

                        interaction.channel.send({embeds: [embeddelete], components: [deletar]})
                        await  client.channels.cache.get("1136050850352091268").send({ content: `\`💾 - Transcript ⤵\``, files: [attachment]})
                        interaction.channel.members.forEach(member => {
                            interaction.channel.permissionOverwrites.edit(member.id, { ViewChannel: false})
                        });
                    } else if(selectedValue === "lock") {    
                if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                        interaction.reply({ content: `**❌ | ${interaction.user}, Você não possui permissão para usar esta opção!**`, ephemeral: true })
                    } else {
                        interaction.channel.members.forEach(member => {
                            interaction.channel.permissionOverwrites.edit(member.id, { SendMessages: false})
                        });
                        interaction.channel.send({content: `**🔐 - Canal trancado, permissão de enviar mensagens removida!**`})
                    }            
              } else if(selectedValue === "unlock") {     
                if (!interaction.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                        interaction.reply({ content: `**❌ | ${interaction.user}, Você não possui permissão para usar esta opção!**`, ephemeral: true })
                    } else {
                        interaction.channel.members.forEach(member => {
                            interaction.channel.permissionOverwrites.edit(member.id, { SendMessages: true})
                        });
                        interaction.channel.send({content: `**🔑 - 🔓 - Canal destrancado, permissão de enviar mensagens concedida!**`})
                        
                    }
              }
            }
        }
    }
    if (interaction.isButton) {
        if (interaction.customId === "deletarticket") {
            let countdown = 3;
    
            // Função que atualiza e exibe o contador no console a cada 1 segundo
            const updateCountdown = () => {
                if (countdown > 0) {
                    interaction.channel.send({content: `Deletando em ${countdown} segundos...`});
                    countdown--;
                }
            };
    
            // Inicializa o intervalo para exibir o contador a cada 1 segundo
            const interval = setInterval(updateCountdown, 1000);
    
            // Função que será chamada após o tempo limite de 3 segundos
            const deleteChannel = () => {
                clearInterval(interval); // Limpa o intervalo para parar de exibir o contador
                interaction.channel.delete()
                    .catch(error => console.error("Erro ao deletar o canal:", error));
            };
    
            // Define o tempo limite de 3 segundos usando setTimeout
            setTimeout(deleteChannel, 3000);
        }
    }
    
});