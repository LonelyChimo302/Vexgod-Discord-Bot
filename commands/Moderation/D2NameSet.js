const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');
const fs = require('@supercharge/fs');
const cooldown = new Set();
const cooldownTime = 60000; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('d2nameset')
		.setDescription('Speicher dir den D2 Namen eines Users ab.')
		.setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der Nutzer dessen D2 Namen du abspeichern möchtest')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('bungieid')
                .setDescription('Die BungieID des Nutzers')
                .setRequired(true)),
	async execute(interaction) {

        await interaction.reply({content: "Alles klar, warte bitte kurz", ephemeral: true})

        const member = interaction.options.getMember('user')
        const userid = member.id
        const BungieID = interaction.options.getString('bungieid')
        var jsondata =  `{ "D2Name" : "${BungieID}" }`

		if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            
          }

		else {
		
        await fs.ensureDir(`./userfiles/${userid}`)

        fs.writeFileSync(`./userfiles/${userid}/D2Name.json`, jsondata);
        
        interaction.editReply("Ist gespeichert ^^");

		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
		}
	},
};