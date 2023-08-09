const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const changelog = fs.readFileSync('./CHANGELOG.md').toString()
const cooldown = new Set();
const cooldownTime = 60000; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('changelog')
		.setDMPermission(false),
	async execute(interaction) {

		if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            
          }

		else {
		await interaction.reply( changelog );
		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
		}
	},
};