const { Events } = require('discord.js');

const requestchannel = '1236748227274084382';

const maraID = '1134558655098916974'

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        if (message.channel.id === requestchannel) {

            if (message.member.id === maraID) return;

            await message.reply({
                poll: {
                    question: {
                        text: 'Soll das zum Emote/Sticker/Soundboard Sound werden?',
                    },
                    answers: [
                        {
                            text: 'Yee',
                            emoji: '1116464522379665458',
                        },
                        {
                            text: 'Nö',
                            emoji: '1116464573797638145',
                        },
                    ],
                    duration: 48, // In Stunden
                    allowMultiselect: false,
                    layoutType: 1, // Single type (optional)
                },
            })
        }
    }
}