const Discord = require("discord.js")

module.exports = {
  name: "requisitos", 
  description: "Veja os requisitos para tag youtuber ou streamer.", 
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (Client, interaction) => {
    interaction.reply({ content: `:wave: Olá, criadores de conteúdo! Como vocês estão?\n\n<:YouTubeiconfull_color_0:1136303476977176648> - Para adquirir o rank **YOUTUBER**, você deve atender aos seguintes requisitos:\n\n- Ter uma média de 800 visualizações e 100 curtidas em um único vídeo OU uma média de 1.000 visualizações e 150 curtidas somadas em vários vídeos durante um período de 15 dias no servidor.\n\n<:twitch_PNG48:1136303428956602419>  - Para adquirir o rank **STREAMER**, você deve cumprir os seguintes requisitos:\n\n- Ter uma média de 210 visualizações durante um período de 15 dias.\n- Ter uma média de 30 seguidores.\n\n\n:pencil: Por favor, lembre-se de seguir as seguintes regras:\n\n- Se a sua solicitação for negada, você terá um prazo de 7 dias para solicitar novamente.\n- Não ter se envolvido em condutas tóxicas recentemente no jogo ou no Discord, mesmo em outras contas.\n- Ter o canal do youtuber ou twitch vinculado ao discord.\n- Não ter sido banido recentemente.\n- Não é necessário marcar a equipe.\n- Não ter utilizado programas ou bots para obter vantagens.\n\n<:livro:1136303386090807377>  Obs: **É obrigatório ter o VOD ativo.**` })
  }
}