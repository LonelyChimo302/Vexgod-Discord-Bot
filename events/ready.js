const { Events, ActivityType } = require('discord.js');

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
	
	'Rhulk has a pretty juicy ass tbh'
]

module.exports = {
	name: Events.ClientReady,
	once: false,
	execute(client) {
        client.user.setPresence({
            activities: [{ name: 'Starting up', type: ActivityType.Watching }],
            status: 'online',
        });
        setInterval(function(){
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setPresence({
                activities: [{ name: status, type: ActivityType.Watching }],
                status: 'online',
            });
        }, 180000)
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};