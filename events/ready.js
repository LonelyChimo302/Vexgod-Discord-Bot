// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		setInterval(function(){
			let status = statuses[Math.floor(Math.random() * statuses.length)]
			client.user.setActivity(status, { type: 'WATCHING' })
		}, 600000);
	},
};