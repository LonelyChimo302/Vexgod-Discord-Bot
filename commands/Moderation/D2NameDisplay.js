const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');
const fs = require('@supercharge/fs');
const cooldown = new Set();
const cooldownTime = 60000; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('d2namedisplay')
		.setDescription('Zeigt die BungieID des Nutzers an')
		.setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der Nutzer dessen D2 Namen du sehen möchtest')
                .setRequired(true)),
	async execute(interaction) {

        await interaction.reply({content: "Alles klar, warte bitte kurz", ephemeral: true})

        const member = interaction.options.getMember('user')
        const userid = member.id
        const path = `./userfiles/${userid}/D2Name.json`
        const exists = fs.existsSync(path)

		if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            
          }

		else if (exists === true) {
            
            delete require.cache[require.resolve(`../../userfiles/${userid}/D2Name.json`)]
            var { D2Name } = require(`../../userfiles/${userid}/D2Name.json`)

            interaction.editReply(`Der Nutzer heißt Ingame: **${D2Name}**`);

		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
		}

        else if (exists === false) {
            interaction.editReply(`IDK, hat mir bisher niemand gesagt. Sprecht am besten einmal den Nutzer darauf an und speichert den Namen mit **/d2nameset** bei der nächsten Gelegenheit ab.`);

		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
        }

        else {
            interaction.editReply(`Irgendwie hast du gerade den Errorcatch ausgelöst. Tobi wird das hier in den Logs sehen und gucken was schief lief. Fürs erste solltest du nen Cheeseburger essen.`);

		cooldown.add(interaction.user.id);
		setTimeout(() => {
			cooldown.delete(interaction.user.id);
		}, cooldownTime);
        }
	},
};