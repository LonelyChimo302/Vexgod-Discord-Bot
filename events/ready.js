const { Events, ActivityType } = require('discord.js');
const fs = require('@supercharge/fs');
const { version } = require('../misc.json');
let statuses = require('./statuslist.js');

const changelog = fs.readFileSync('./CHANGELOG.md').toString();

const reactionchannel = '1187808184916787381';

module.exports = {
	name: Events.ClientReady,
	once: false,
	async execute(client) {
		client.user.setPresence({
			activities: [{ name: `potatOS Version ${version} starting up.`, type: ActivityType.Watching }],
			status: 'idle',
		});
		setInterval(function () {

			let status = statuses[Math.floor(Math.random() * statuses.length)]
			client.user.setPresence({
				activities: [status],
				status: 'online',
			});
		}, 180000)
		console.log(`Ready! Logged in as ${client.user.tag}`);

		if (process.argv[2] && process.argv[2] === '-v') {
			client.channels.cache.get('1084198804108095660').send('**Holy shit, new Version just dropped!!!**');
			client.channels.cache.get('1084198804108095660').send(changelog)
				.catch(() => client.channels.cache.get('1084198804108095660').send({ content: 'Ups, der Changelog dieser Version ist zu lang, ich wandel ihn in ein Bild um.', files: ["./pictures/Changelog.png"] }));
		}

		else if (process.argv[2] && process.argv[2] === '-t') return;

		else {
			console.log('Im up')
		}

		await client.channels.cache.get(reactionchannel).messages.fetch('1412477129127366666')

		await client.channels.cache.get(reactionchannel).messages.fetch('1412477163432706138')
	}
}