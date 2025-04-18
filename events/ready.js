const { Events, ActivityType } = require('discord.js');
const fs = require('@supercharge/fs');
const { version } = require('../misc.json');
let statuses = require('./statuslist.js');

const changelog = fs.readFileSync('./CHANGELOG.md').toString();

const reactionchannel = '1187808184916787381';

const reactionmessagetext = fs.readFileSync('./REACTIONMESSAGE.md').toString();

const consentmessagetext = fs.readFileSync('./CONSENTMESSAGE.md').toString();

let EmoteIDs = ['1187771288538861689', '1187773164533600377', '1187773148867870851', '1187773174813839530', '1116463855955091518', '1187773155473887242', '1187773151850020874', '1187772048102133761', '1261600995100725248', '1187773171311591474', '1187773167628992564']

const Amogusded = '1164163602433974312';

const Amogus = '1164163598763966564'

module.exports = {
	name: Events.ClientReady,
	once: false,
	async execute(client) {
		client.user.setPresence({
			activities: [{ name: `Nessussoßen-Bot Version ${version} starting up.`, type: ActivityType.Watching }],
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

		await client.channels.cache.get(reactionchannel).bulkDelete(10)
		const reactionmessage = await client.channels.cache.get(reactionchannel).send(reactionmessagetext)

		for (i in EmoteIDs) {
			await reactionmessage.react(EmoteIDs[i])
		}

		const consentmessage = await client.channels.cache.get(reactionchannel).send(consentmessagetext)
		await consentmessage.react(Amogus)
		await consentmessage.react(Amogusded)
	}
}