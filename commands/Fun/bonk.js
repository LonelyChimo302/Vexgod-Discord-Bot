const { SlashCommandBuilder } = require('discord.js');

const cooldown = new Set();
const cooldownTime = 5000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('Ab in den Horny-Jail')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Welcher User ist horny?')
                .setRequired(true)),

    async execute(interaction) {

        var user = interaction.options.getUser('user');
        var userid = user.id

        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true });

        }
        else {

            await interaction.reply({ content: `BONK! <@${userid}>! Go to Horny-Jail!`, files: ['./pictures/bonk.gif'] });

            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);

        }
    },
};