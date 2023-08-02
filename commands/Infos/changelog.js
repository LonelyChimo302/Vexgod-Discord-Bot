const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const changelog = fs.readFileSync('./CHANGELOG.md').toString()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('changelog')
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.reply( changelog );
	},
};