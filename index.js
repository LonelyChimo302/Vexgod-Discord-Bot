// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
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
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Load up the Commands

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Load up the Events

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Set Playing Status

setInterval(function(){
    let status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setActivity(status, { type: 'WATCHING' })
}, 600000);


// Log in to Discord with your client's token

client.login(token);