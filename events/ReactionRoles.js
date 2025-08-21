const { Events } = require('discord.js');
const client = require("../index.js");
const botid = '1134558655098916974'
const testchannelid = '1187727547711111199';
const channelid = '1187808184916787381'

const moba = { emote: '1187771288538861689', role: '1187808893859024986' };

const shooter = { emote: '1187773164533600377', role: '1187809106829000806' };

const simulator = { emote: '1187773148867870851', role: '1187809202618519653' };

const mmo = { emote: '1187773174813839530', role: '1187809260374077551' };

const horror = { emote: '1187773155473887242', role: '1187809323125059615' };

const fighting = { emote: '1187773151850020874', role: '1187808991447875694' };

const sandbox = { emote: '1187772048102133761', role: '1187809386643595284' };

const racing = { emote: '1261600995100725248', role: '1261601324714299413' };

const vr = { emote: '1187773171311591474', role: '1187809479157362739' };

const other = { emote: '1187773167628992564', role: '1187809553157472286' };

const rpg = { emote: '1116463855955091518', role: '1236744003299311769' };

const no = { emote: '1164163602433974312', role: '1237782649477664839' };

const fgping = { emote: '1116459600791752744', role: '1405476709062545408' };

let emoteArray = [moba, shooter, simulator, mmo, horror, fighting, sandbox, racing, vr, other, rpg, no, fgping]

module.exports = {
    name: Events.MessageReactionAdd,
    once: false,
    async execute(reaction, user) {

    //  const testguild = await client.guilds.fetch('1133666004657000479')  
        const guild = await client.guilds.fetch('1084180121944068236')
        const userid = user.id
        const member = await guild.members.fetch(userid);

        try {
            if (user.id === botid) return;


            if (reaction.message.channelId != channelid) {
                return;
            }

            for (var genre of emoteArray) {

                if (reaction.emoji.id === genre.emote) {
                    await member.roles.add(genre.role)
                }

            }

        }


        catch (error) {
            console.error(error)
        }
    }
}