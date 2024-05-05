const { Events } = require('discord.js');

const testchannel = '1133666005172887564';

const requestchannel = '1236748227274084382';

const testbotid = '1133670597277261876';

const maraid = '1134558655098916974';

module.exports = {
	name: Events.MessageCreate,
    once: false,
	async execute(message) { 

    if (message.channel.id === requestchannel) {
        if (message.member.id === maraid) {

        }
        else {
        await message.reply({poll: {
            question: {
                text: 'Soll das zum Emote/Sticker/Soundboard Sound werden?',
            },
            answers: [
                {
                    text: 'Yee',
                    emoji: '1187768631430500362',
                },
                {
                    text: 'Nö',
                    emoji: '1187768721377349744',
                },
            ],
            duration: 48, // In Stunden
            allowMultiselect: false,
            layoutType: 1, // Single type (optional)
        },})}
        }
    else {

    }},
    }