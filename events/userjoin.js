const { Events } = require('discord.js');
const role = '1115225025306439691';
const { joinmessage } = require('../misc.json');
const client = require("../index.js");
const channel = '1084198804108095660'

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	async execute(member) {
		member.send(joinmessage)
			.catch(() => client.channels.cache.get(channel).send(`Hey ${member}, da ich dir keine DM schreiben darf (Das hast du in deinen Discord-Kontoeinstellungen so festgelegt), schicke ich sie dir auf diesem Weg:\n\n**${joinmessage}**`));
		member.roles.add(role)
	},
};