const { SlashCommandBuilder } = require('discord.js');

const cooldown = new Set();
const cooldownTime = 5000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('freewill')
        .setDescription('Hat dieser Bot freien Willen?'),

    async execute(interaction) {

        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true });

        }
        else {

            await interaction.reply("Kann ich meinem Discord Bot freien Willen geben?\nKurz gesagt: Nicht wirklich.\nEin Discord-Bot ist ein Programm, das auf Basis von Code arbeitet. Alles, was er tut, basiert auf vordefinierten Regeln, Algorithmen oder maschinellem Lernen, aber er kann keine eigenen Entscheidungen im Sinne eines freien Willens treffen.");

            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);

        }
    },
};