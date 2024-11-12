const { Events } = require('discord.js');
const client = require("../index.js");
const botid = '1134558655098916974'
const testchannelid = '1187727547711111199';
const channelid = '1187808184916787381'

const MOBA = '1187771288538861689';
const MOBArole = '1187808893859024986'

const Shooter = '1187773164533600377';
const Shooterrole = '1187809106829000806'

const Simulator = '1187773148867870851';
const Simulatorrole = '1187809202618519653'

const MMO = '1187773174813839530';
const MMOrole = '1187809260374077551'

const Horror = '1187773155473887242';
const Horrorrole = '1187809323125059615'

const Fighting = '1187773151850020874';
const Fightingrole = '1187808991447875694'

const Sandbox = '1187772048102133761';
const Sandboxrole = '1187809386643595284'

const racing = '1261600995100725248'
const racingrole = '1261601324714299413'

const VR = '1187773171311591474';
const VRrole = '1187809479157362739'

const Other = '1187773167628992564';
const Otherrole = '1187809553157472286'

const RPG = '1116463855955091518';
const RPGrole = '1236744003299311769'

const no = '1164163602433974312';
const consentrole = '1237782649477664839'

module.exports = {
	name: Events.MessageReactionAdd,
    once: false,
	async execute(reaction, user) { 

    //    const testguild = await client.guilds.fetch('1133666004657000479')  
        const guild = await client.guilds.fetch('1084180121944068236') 
        const userid = user.id 
        const member = await guild.members.fetch(userid);

   try{  
        if (user.id === botid){
            console.log('Bot Reacted')
        }  
        else if (reaction.message.channelId === channelid ){

            if (reaction.emoji.id === MOBA){
                await member.roles.add(MOBArole)
            }
            else if (reaction.emoji.id === Shooter){
                await member.roles.add(Shooterrole)
            }
            else if (reaction.emoji.id === Sandbox){
                await member.roles.add(Sandboxrole)
            }
            else if (reaction.emoji.id === Simulator){
                await member.roles.add(Simulatorrole)
            }
            else if (reaction.emoji.id === Horror){
                await member.roles.add(Horrorrole)
            }
            else if (reaction.emoji.id === VR){
                await member.roles.add(VRrole)
            }
            else if (reaction.emoji.id === Other){
                await member.roles.add(Otherrole)
            }
            else if (reaction.emoji.id === MMO){
                await member.roles.add(MMOrole)
            }
            else if (reaction.emoji.id === Fighting){
                await member.roles.add(Fightingrole)
            }
            else if (reaction.emoji.id === RPG){
                await member.roles.add(RPGrole)
            }
            else if (reaction.emoji.id === no){
                await member.roles.add(consentrole)
            }
            else if (reaction.emoji.id === racing){
                await member.roles.add(racingrole)
            }
            else {
                
            }
        }

        else {
        }
    } catch (error){
        console.error(error)
    }
	},
};