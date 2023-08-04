const { version } = require('../misc.json');

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

let status = statuses[Math.floor(Math.random() * statuses.length)]

module.exports = status