const client = require("../../index.js")

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const cooldown = new Set();

const cooldownTime = 30000; 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tempjail')
		.setDescription('Steck einen User für eine festgelegte Zeit ins Gefängnis')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Der Nutzer der gesperrt werden soll')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('zeit')
                .setDescription('Wie lange (in Millisekunden) MAX: 2419200000 (28 Tage)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('grund')
                .setDescription('Der Grund du Huso')
                .setRequired(true)),

	async execute(interaction) {
    
    const nutzer = interaction.options.getUser('user');
    const ms = interaction.options.getInteger('zeit');
    const grund = interaction.options.getString('grund');
    const member = interaction.options.getMember('user');


    function msToTime() {

        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Sek";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Std";
        else return days + " Tage"
      }
    const zeit = msToTime(ms)

    if (cooldown.has(interaction.user.id)) {
        /// If the cooldown did not end
        interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
        
      }

    else if (ms > '2419200000') {

        await interaction.reply({ content: `Bro nein, da steht doch wie viel das Maximum ist... 28 Tage/2419200000ms`, ephemeral: true })
        cooldown.add(interaction.user.id);
        setTimeout(() => {
            cooldown.delete(interaction.user.id);
        }, cooldownTime);

    }
    
    else if (await client.user.id == await member.user.id) {
       await interaction.reply({ content: `Bro nein, ich kann mich doch nicht selbst Timeouten`, ephemeral: true })
       cooldown.add(interaction.user.id);
       setTimeout(() => {
           cooldown.delete(interaction.user.id);
       }, cooldownTime);
    }


    else {
        await nutzer.send(`Du wurdest gerade getimeouted. Du wirst erst wieder in **${zeit}** mit dem Server interagieren können. Der Grund den der Admin/Mod genannt hat: **${grund}**`);
        await member.timeout(ms);
		await interaction.reply({ content: `Der Nutzer **${nutzer}** wird nun für **${zeit}** gesperrt`, ephemeral: true });
        cooldown.add(interaction.user.id);
        setTimeout(() => {
            cooldown.delete(interaction.user.id);
        }, cooldownTime);
        }
    },
};
