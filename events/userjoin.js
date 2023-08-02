const { Events } = require('discord.js');
const role = '1115225025306439691';
const roletest = '1135279145199349781';
const { joinmessage } = require('../misc.json')
const client = require("../index.js")

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	execute(member) {

		if (client.user.id == '1134558655098916974') {

			member.send(joinmessage);
			member.roles.add(role)

		}

		else {
			member.send(joinmessage);
			member.roles.add(roletest)
		}
	},
};