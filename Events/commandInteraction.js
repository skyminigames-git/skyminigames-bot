require('../bot')

const Discord = require('discord.js')
const client = require('../bot')

client.on("interactionCreate", (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return interaction.reply({
                content: `Ocorreu um erro, por favor, contate <@580426757501353995>`,
                ephemeral: true,
            });

        interaction["member"] = interaction.guild.members.cache.get(
            interaction.user.id
        );

        cmd.run(client, interaction);
    }
});