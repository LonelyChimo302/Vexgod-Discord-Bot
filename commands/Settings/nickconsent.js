const { SlashCommandBuilder } = require('discord.js');
const fs = require('@supercharge/fs');
const cooldown = new Set();
const cooldownTime = 10000; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nickconsent')
		.setDescription('Sag mir, wenn ich deinen Namen nicht ändern darf (z.B. /exolost command)')
        .addBooleanOption(option =>
            option.setName('janein')
                  .setDescription('Ja oder Nein?')
                  .setRequired(true)),
	async execute(interaction) {

        const consent = interaction.options.getBoolean('janein')
        const userid = interaction.member.id
        await fs.ensureDir(`./userfiles/${userid}`)
		var jsondata =  `{ "consent" : "${consent}" }`
        fs.writeFileSync(`./userfiles/${userid}/nickconsent.json`, jsondata);
        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true});
            
          }
        else if ( consent === false) {
            await interaction.reply({ content: 'Alles Klar, niemand darf in Zukunft deinen Nickname mit irgendwelchen Fun-Commands verändern. Dies Schützt aber nicht vor manueller Änderung durch Mods oder dem Admin, sollte dein Name irgendwelche Regeln brechen oder ähnliches.\nSolltest du dich in Zukunft anders entscheiden, kannst du jederzeit diesen Command erneut verwenden.', ephemeral: true})
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }
        else {
            await interaction.reply({content: 'cool', ephemeral: true})
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }
	},
};