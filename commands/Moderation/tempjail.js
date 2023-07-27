const { SlashCommandBuilder, PermissionFlagsBits, Client } = require('discord.js');
const msToTimecode = require('ms-to-timecode');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tempjail')
		.setDescription('Steck einen User für eine festgelegte Zeit ins Gefängnis')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der Nutzer der gesperrt werden soll')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('zeit')
                .setDescription('Wie lange (in Millisekunden')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('grund')
                .setDescription('Der Grund du Huso')
                .setRequired(true)),

	async execute(interaction) {

    const user = interaction.options.getUser('user');
    const ms = interaction.options.getInteger('zeit');
    const grund = interaction.options.getString('grund')

    function msToTime() {

        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Sek";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Std";
        else return days + " Tage"
      }
    const zeit = msToTime(ms)
        await Client.users.send(user, `Du wurdest gerade getimeouted. Du wirst erst wieder in ${zeit} mit dem Server interagieren können. Der Grund den der Admin/Mod genannt hat: ${grund}`)
     // await user.timeout(ms);
		await interaction.reply({ content: `Der Nutzer ${user} wird nun für ${zeit} gesperrt`, ephemeral: true });
	},
};