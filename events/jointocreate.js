/** @type {Set<import('discord.js').Snowflake>} */
const temporaryChannels = new Set();

const fs = require('@supercharge/fs');

const { Events, ChannelType, PermissionsBitField } = require('discord.js');

const jtcchannel = '1112812765942399090';

const parent = '1084190001509711873';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

var jsondata =  `{ "lastactive" : "${today}" }`

module.exports = {
	name: Events.VoiceStateUpdate,
	once: false,
	async execute(oldUser, newUser) {      

        const userid = newUser.member.id

        const path = `./userfiles/${userid}/voice.json`

        const exists = fs.existsSync(path)

        const username = newUser.member.displayName;
    
        const oldchannel = oldUser.channel;

        const oldchannelID = oldUser.channelId;

        const channel = newUser.channelId;

        await fs.ensureDir(`./userfiles/${userid}`)

        fs.writeFileSync(`./userfiles/${userid}/lastactive.json`, jsondata);

        if (exists === true) {
            delete require.cache[require.resolve(`../userfiles/${userid}/voice.json`)]
            var { name } = require(`../userfiles/${userid}/voice.json`)
        }
        else {
            var name = `${username}'s channel`
        }
try {

    if ( channel === jtcchannel ) {

            await newUser.guild.channels.create({
                name: `${name}`,
                type: ChannelType.GuildVoice,
                parent: parent,           
            })
            .then(async channel => {
                temporaryChannels.add(channel.id);
                await newUser.setChannel(channel.id);
                channel.permissionOverwrites.set([
                    {
                        id: newUser.id,
                        allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ReadMessageHistory]
                    }
                ])
            });
        
        }        
    
    if (oldchannel.members.size <= 0 && oldchannel.parentId === parent && oldchannelID !== jtcchannel && oldchannelID !== channel) {

        await oldchannel.delete();
        temporaryChannels.delete(oldchannelID)

    }

}    catch (error) {
    
    }
    }
};