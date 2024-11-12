const { SlashCommandBuilder } = require('discord.js');
const cooldown = new Set();
const cooldownTime = 10000; 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('d2archiv')
		.setDescription('Postet einen Link zum Destiny2 Archivserver'),
	async execute(interaction) {

		if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true});
            
          }
		else {
		await interaction.reply('Hier der Invitelink zum Archivserver: https://discord.gg/KphGX8u47t \n Hier findest du alle alten D2 Channel in denen nützliche Infos oder Guides zu diversen D2 Raids und Dungeons zu finden sind.');
		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
		}
	},
};