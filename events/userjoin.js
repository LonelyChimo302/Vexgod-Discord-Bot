const { Events } = require('discord.js');
const role = '1115225025306439691';
const roletest = '1135279145199349781';
const { joinmessage } = require('../misc.json');
const client = require("../index.js");
const testchannel = '1133666005172887564';
const channel = '1084198804108095660'

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	async execute(member) {

		if (client.user.id == '1134558655098916974') {

			member.send(joinmessage)
				.catch (() => client.channels.cache.get(channel).send(`Hey ${member}, da ich dir keine DM schreiben darf (Das hast du in deinen Discord-Kontoeinstellungen so festgelegt), schicke ich sie dir auf diesem Weg:\n\n**${joinmessage}**`));
			member.roles.add(role)

		}

		else {
			member.send(joinmessage)
				.catch (() => client.channels.cache.get(testchannel).send(`Hey ${member}, da ich dir keine DM schreiben darf (Das hast du in deinen Discord-Kontoeinstellungen so festgelegt), schicke ich sie dir auf diesem Weg:\n\n**${joinmessage}**`));
			member.roles.add(roletest)
		}
	},
};