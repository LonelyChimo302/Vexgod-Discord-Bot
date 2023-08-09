const { SlashCommandBuilder } = require('discord.js');
const fs = require('@supercharge/fs');
const cooldown = new Set();
const cooldownTime = 10000; 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('exolost')
		.setDescription('Fucking Loser')
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Welcher User ist ein exolost?')
                .setRequired(true)),
	async execute(interaction) {

    try {
        await interaction.reply({ content: 'Was 1 Pimmel lol', ephemeral: true});

        const turnNewToSuperscript = (s) => s.replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])

        const turnOldToSuperscript = (exolost) => exolost.replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])

        const member = interaction.options.getMember('user')

        const name = member.displayName

        const userid = member.id

        await fs.ensureDir(`./userfiles/${userid}`)

        const path = `./userfiles/${userid}/exo.json`

        const pathconsent = `./userfiles/${userid}/nickconsent.json`

        const existsconsent = fs.existsSync(pathconsent)

        const exists = fs.existsSync(path)

        if (existsconsent === true){
            var { consent } = require(`../../userfiles/${userid}/nickconsent.json`)
        }
        else if (existsconsent === false){
            var consent = "true"
        }

        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            
          }

        else if (exists === true && name.includes('Exolost') && consent === "true" ) {
            delete require.cache[require.resolve(`../../userfiles/${userid}/exo.json`)]
            var { exolost } = require(`../../userfiles/${userid}/exo.json`)
            var exolostint = Number(exolost)
            var exolostaddition = exolostint + 1
            var s = exolostaddition.toString()
            var oldsuperscript = turnOldToSuperscript(exolost)
            var newsuperscript = turnNewToSuperscript(s)
            var newname = name.replace(oldsuperscript, newsuperscript)
            var jsondata =  `{ "exolost" : "${s}" }`

            fs.writeFileSync(`./userfiles/${userid}/exo.json`, jsondata);

            await member.setNickname(newname)
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }

        else if (exists === true && !name.includes('Exolost') && consent === "true") {
            delete require.cache[require.resolve(`../../userfiles/${userid}/exo.json`)]
            var { exolost } = require(`../../userfiles/${userid}/exo.json`)
            var exolostint = Number(exolost)
            var exolostaddition = exolostint + 1
            var s = exolostaddition.toString()
            var oldsuperscript = turnOldToSuperscript(exolost)
            var newsuperscript = turnNewToSuperscript(s)
            var newname = `${name} (Exolost${newsuperscript})`
            var jsondata =  `{ "exolost" : "${s}" }`

            fs.writeFileSync(`./userfiles/${userid}/exo.json`, jsondata);

            await member.setNickname(newname)
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }

        else if (exists === false && name.includes('Exolost') && consent === "true") {
            var jsondata =  `{ "exolost" : "1" }`
            var s = '1'
            var superscript = turnNewToSuperscript(s)
            var newname = name.replace(/⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|Exolost|[()]/g, '')
            await member.setNickname(`${newname}(Exolost${superscript})`)
            fs.writeFileSync(`./userfiles/${userid}/exo.json`, jsondata);
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }

        else if (userid === '1133670597277261876' | userid === '1134558655098916974') {
            interaction.editReply('Ne, ich werd mich nicht selbst umbennen und somit unnötig Tobis Speicherplatz zumüllen.')
        }

        else if ( consent === "false" ) {
            interaction.editReply('Der Nutzer hat mit **/nickconsent** angegeben, dass er das nicht möchte.')
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }

        else {
            var jsondata =  `{ "exolost" : "1" }`
            var s = '1'
            var superscript = turnNewToSuperscript(s)
            
            await member.setNickname(`${name} (Exolost${superscript})`)
            fs.writeFileSync(`./userfiles/${userid}/exo.json`, jsondata);
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }
    }

    catch (error){
        console.error(error)
        interaction.editReply('Irgendwas dummes ist passiert. Entweder ich habe keine Rechte den Namen zu ändern, der finale Name wäre zu lang für Discord oder ein anderer unbekannter Error wurde ausgespuckt.')
    }
	},  
};