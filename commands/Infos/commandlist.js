const { SlashCommandBuilder } = require('discord.js');
const fs = require('@supercharge/fs');

const cooldown = new Set();
const cooldownTime = 60000;

const channel = '1084198804108095660'
const testchannel = '1133666005172887564';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('help')
		.setContexts(['1']),

	async execute(interaction) {

		const client = require("../../index.js")
		const user = interaction.member

		if (cooldown.has(interaction.user.id)) {

			interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true });

		}

		else {

			await interaction.reply({ content: "Check deine DM's", ephemeral: true });

			await interaction.member.send({ content: '**Die Commandlist ist inzwischen zu lang für Discord (max 2000 Zeichen), daher musste ich auf .png umsteigen:**', files: ['./pictures/Commandlist.png'] })
				.catch(() => client.channels.cache.get(channel).send({
					content: `Hey ${user}, da ich dir keine DM schreiben darf (Das hast du in deinen Discord-Kontoeinstellungen so festgelegt), schicke ich dir die Liste auf diesem Weg:\n\n
**Die Commandlist ist inzwischen zu lang für Discord (max 2000 Zeichen), daher musste ich auf .png umsteigen:** `, files: ['./pictures/Commandlist.png']
				}));

			cooldown.add(interaction.user.id);
			setTimeout(() => {
				cooldown.delete(interaction.user.id);
			}, cooldownTime);
		}
	},
};