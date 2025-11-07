const { SlashCommandBuilder } = require('discord.js');

const cooldown = new Set();
const cooldownTime = 5000;

const userid = '358735057386471425';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chimoffline')
        .setDescription('Wir haben nen Admin?'),

    async execute(interaction) {


        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true });

        }
        else {

            await interaction.reply('Ich guck mal kurz ob er lebt.')

            delete require.cache[require.resolve(`../../userfiles/${userid}/lastactive.json`)]
                var { lastactive } = require(`../../userfiles/${userid}/lastactive.json`)

                interaction.editReply(`Er lebt gerade so noch.\n\nChimo hat seine soziale Inkompetenz das letzte mal am ${lastactive} überwunden.`);

            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);

        }
    },
};