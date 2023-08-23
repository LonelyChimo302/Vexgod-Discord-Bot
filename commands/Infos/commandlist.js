const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const commands = fs.readFileSync('./COMMANDLIST.md').toString()
const cooldown = new Set();
const cooldownTime = 60000; 
const channel = '1084198804108095660'
const testchannel = '1133666005172887564';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('help'),
	async execute(interaction) {

		const client = require("../../index.js")
		const member = interaction.member

		if (cooldown.has(interaction.user.id)) {
            
            interaction.reply({content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true});
            
          }

		else {
            interaction.reply({content: "Check deine DM's", ephemeral: true});
            interaction.member.send(commands)
            .catch (() => client.channels.cache.get(channel).send(`Hey ${member}, da ich dir keine DM schreiben darf (Das hast du in deinen Discord-Kontoeinstellungen so festgelegt), schicke ich dir die Liste auf diesem Weg:\n\n${commands}`));
		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
		}
	},
};