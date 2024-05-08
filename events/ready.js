const { Events, ActivityType } = require('discord.js');

const fs = require('fs');

const { version } = require('../misc.json');

const changelog = fs.readFileSync('./CHANGELOG.md').toString();

let statuses = require('./statuslist.js');

const reactionchannel = '1187808184916787381';

const reactionmessagetext = fs.readFileSync('./REACTIONMESSAGE.md').toString();

const consentmessagetext = fs.readFileSync('./CONSENTMESSAGE.md').toString();

const MOBA = '1187771288538861689';

const Destiny = '1116463546608390245';

const Shooter = '1187773164533600377';

const Simulator = '1187773148867870851';

const MMO = '1187773174813839530';

const Horror = '1187773155473887242';

const Fighting = '1187773151850020874';

const Sandbox = '1187772048102133761';

const VR = '1187773171311591474';

const Other = '1187773167628992564';

const RPG = '1116463855955091518';

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
        setInterval(function(){

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
		}

		else if (process.argv[2] && process.argv[2] === '-r'){
			console.log('Rebooted')
		}


		else {
			console.log('Im up')
		}    
		await client.channels.cache.get(reactionchannel).bulkDelete(10)
		const reactionmessage = await client.channels.cache.get(reactionchannel).send(reactionmessagetext)
		await reactionmessage.react(Shooter)
		await reactionmessage.react(Simulator)
		await reactionmessage.react(MMO)
		await reactionmessage.react(RPG)
		await reactionmessage.react(Horror)
		await reactionmessage.react(MOBA)
		await reactionmessage.react(Fighting)
		await reactionmessage.react(Sandbox)
		await reactionmessage.react(VR)
		await reactionmessage.react(Other)
		await reactionmessage.react(Destiny)

		const consentmessage = await client.channels.cache.get(reactionchannel).send(consentmessagetext)
		await consentmessage.react(Amogus)
		await consentmessage.react(Amogusded)
}
}
