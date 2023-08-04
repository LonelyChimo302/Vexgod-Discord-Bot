/** @type {Set<import('discord.js').Snowflake>} */
const temporaryChannels = new Set();

const fs = require('@supercharge/fs');

const { Events, ChannelType, PermissionsBitField } = require('discord.js');

const jtcchannel = '1112812765942399090';

const parent = '1084190001509711873';

module.exports = {
	name: Events.VoiceStateUpdate,
	once: false,
	async execute(oldUser, newUser) {      

        const userid = newUser.member.id

        const path = `./commands/Fun/userVCnames/${userid}.json`

        const exists = fs.existsSync(path)

        const username = newUser.member.displayName;
    
        const oldchannel = oldUser.channel;

        const oldchannelID = oldUser.channelId;

        const channel = newUser.channelId;

        if (exists === true) {
            delete require.cache[require.resolve(`../commands/Fun/userVCnames/${userid}.json`)]
            var { name } = require(`../commands/Fun/userVCnames/${userid}.json`)
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
    
    if (oldchannel.members.size <= 0 && oldchannelID !== jtcchannel && oldchannelID !== channel) {

        await oldchannel.delete();
        temporaryChannels.delete(oldchannelID)

    }

}    catch (error) {
    console.error(error)
    }
    }
};