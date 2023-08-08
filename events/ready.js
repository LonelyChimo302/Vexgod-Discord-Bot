const { Events, ActivityType } = require('discord.js');

const fs = require('fs');

const { version } = require('../misc.json');

const changelog = fs.readFileSync('./CHANGELOG.md').toString()

let status = require('./statuslist.js')

module.exports = {
	name: Events.ClientReady,
	once: false,
	execute(client) {
        client.user.setPresence({
            activities: [{ name: `Nessussoßen-Bot Version ${version} starting up.`, type: ActivityType.Watching }],
            status: 'idle',
        });
        setInterval(function(){
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
	},
};
