const { SlashCommandBuilder } = require('discord.js');

const fs = require('node:fs');

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

        const vcname = interaction.options.getString('name')
        
        const memberid = interaction.member.id

        const jsondata =  `{ "name" : "${vcname}" }`
        
        fs.writeFileSync(`./commands/Fun/userVCnames/${memberid}.json`, jsondata);

		await interaction.reply({ content: `Wird gemacht. Dein Channel heißt in Zukunft ${vcname}`, ephemeral: true });
	},
};