const { SlashCommandBuilder } = require('discord.js');

const cooldown = new Set();
const cooldownTime = 5000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stonks')
        .setDescription('Kaufen, jetzt!'),

    async execute(interaction) {

        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true });

        }
        else {

            await interaction.reply('Investiere jetzt in diese seriöse Währung: https://pump.fun/coin/GkxDoCXAaFKDBy7ckXLFdxAEqyHEkSPbJPWGUqHGpump');

            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);

        }
    },
};