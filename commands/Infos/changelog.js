const { SlashCommandBuilder } = require('discord.js');
const {changelog} = require('../../version.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('changelog')
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.reply( changelog );
	},
};