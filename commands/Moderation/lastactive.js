const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const fs = require('@supercharge/fs');

const cooldown = new Set();

const cooldownTime = 10000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lastactive')
        .setDescription('Wann ein Nutzer das Letzte mal im VC war.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der Nutzer dessen Aktivität in Frage gestellt wird')
                .setRequired(true)),

    async execute(interaction) {
        try {

            await interaction.reply({ content: 'Gib mir ne Sekunde.', ephemeral: true })

            const member = interaction.options.getMember('user')
            const userid = member.id

            await fs.ensureDir(`./userfiles/${userid}`)
            const path = `./userfiles/${userid}/lastactive.json`
            const exists = fs.existsSync(path)

            if (cooldown.has(interaction.user.id)) {
                /// If the cooldown did not end
                interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");

            }

            else if (exists === true) {
                delete require.cache[require.resolve(`../../userfiles/${userid}/lastactive.json`)]
                var { lastactive } = require(`../../userfiles/${userid}/lastactive.json`)

                interaction.editReply(`Jo, der Nutzer war am ${lastactive} zuletzt in einem VC. Bitte nutze die in Discord integrierte Suche (Oben Rechts, wenn du am PC bist) um noch rauszufinden wann er das letzte mal eine Chatnachricht geschrieben hat.`)

                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, cooldownTime);
            }

            else {
                interaction.editReply('Dieser Nutzer war entweder noch nie im VC aktiv oder das letzte mal war vorm **27.01.2025** (als alle Userfiles zurückgesetzt wurden). Bitte nutze die in Discord integrierte Suche (Oben Rechts, wenn du am PC bist) um noch rauszufinden wann er das letzte mal eine Chatnachricht geschrieben hat.')

                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, cooldownTime);
            }
        }
        catch (error) {

        }
    }
}
