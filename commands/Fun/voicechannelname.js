const { SlashCommandBuilder } = require('discord.js');
const superfs = require('@supercharge/fs');
const fs = require('node:fs');
const cooldown = new Set();
const cooldownTime = 10000;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voicechannelname')
		.setDescription('Stell dir deinen Semi-Permanenten VC Namen ein.')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Der Name, den dein Channel in Zukunft tragen soll.')
                .setRequired(true)),
	async execute(interaction) {

        if (cooldown.has(interaction.member.id)) {
            /// If the cooldown did not end
            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true});
            
          }
        else {
            const vcname = interaction.options.getString('name')
        
            const memberid = interaction.member.id

            const jsondata =  `{ "name" : "${vcname}" }`
        
            await superfs.ensureDir(`./userfiles/${memberid}`)

            fs.writeFileSync(`./userfiles/${memberid}/voice.json`, jsondata);

		    await interaction.reply({ content: `Wird gemacht. Dein Channel heißt in Zukunft ${vcname}`, ephemeral: true });

            cooldown.add(interaction.user.id);

            setTimeout(() => {
                cooldown.delete(interaction.member.id);
            }, cooldownTime);
        }
	},
};