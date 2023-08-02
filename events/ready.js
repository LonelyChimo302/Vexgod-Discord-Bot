const { Events, ActivityType } = require('discord.js');

const fs = require('fs');

const { version } = require('../misc.json');

const changelog = fs.readFileSync('./CHANGELOG.md').toString()

let statuses=[
    'Daddy Shaxx Rule34',

	'Mara Sov Rule34',
	
	'Chimo playing with my Spaghetti-Code',
	
	'Florian commiting warcrimes',
	
	'Manuu-Onlyfans',
	
	'Seb ranting about Diablo IV',
	
	'Jona playing the Roots of Salvation Raid',
	
	'Mudfrog catching insects with his tounge',
	
	'Man diese Statusanzeigen machen auf deutsch keinen Sinn',
	
	'HELP, HEEEEELP, HEEEEEEEEEELP',
	
	'Shadow Money Wizard Gang',
	
	'We love casting spells',
	
	'Rhulk has a pretty juicy ass tbh',

	'Thomas cooking...something...',

	`Nessussoßen Bot Version ${version}`,
	
	'Shaggy Ball Z and One Jump Man',

	'Kevin fap the shit out of his dick'
]

module.exports = {
	name: Events.ClientReady,
	once: false,
	execute(client) {
        client.user.setPresence({
            activities: [{ name: `Nessussoßen-Bot Version ${version} starting up.`, type: ActivityType.Watching }],
            status: 'idle',
        });
        setInterval(function(){
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setPresence({
                activities: [{ name: status, type: ActivityType.Watching }],
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
