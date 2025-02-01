const { SlashCommandBuilder } = require('discord.js');
const fs = require('@supercharge/fs');
const { convert2img } = require("mdimg");

const changelog = fs.readFileSync('./CHANGELOG.md').toString()

const cooldown = new Set();
const cooldownTime = 60000;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('changelog'),

	async execute(interaction) {

		await interaction.reply('Uno Momento')

		if (cooldown.has(interaction.user.id)) {
			/// If the cooldown did not end
			interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");

		}

		else {

			await convert2img({
				mdFile: "./CHANGELOG.md",
				outputFilename: "./pictures/Changelog.png",
				width: 2000,
				cssTemplate: "githubDark",
			});

			await interaction.editReply(changelog)
				.catch(() => interaction.editReply({ content: 'Ups, der Changelog dieser Version ist zu lang, ich wandel ihn in ein Bild um.', files: ["./pictures/Changelog.png"] }))

			await fs.remove('./pictures/Changelog.png')

			cooldown.add(interaction.user.id);
			setTimeout(() => {
				cooldown.delete(interaction.user.id);
			}, cooldownTime);
		}
	},
};