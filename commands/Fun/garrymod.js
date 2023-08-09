const { SlashCommandBuilder } = require('discord.js');
const cooldown = new Set();
const cooldownTime = 10000; 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('garrysmod')
		.setDescription('Postet alle Links die du brauchst um mit uns TTT zu spielen'),
	async execute(interaction) {

		if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true});
            
          }
		else {
		await interaction.reply('Um mit den Jungs TTT spielen zu können werden folgende Sachen benötigt:\nDie Modpacks, bitte logge dich bei Steam ein und klicke auf "Alle abonnieren"/"Subscribe to all":\n[Modpack 1](<https://steamcommunity.com/sharedfiles/filedetails/?id=2993913414>)\n\n[Modpack 2](<https://steamcommunity.com/sharedfiles/filedetails/?id=2996361218>)\n\nZusätzlich, installierst du bitte noch die Source SDKs von Steam, frag bitte einen Mod oder Admin welche benötigt werden.');
		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
		}
	},
};