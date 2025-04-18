const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        var messagetext = message.content

        if (messagetext.toLowerCase().includes("hawk tuah")) {
            await message.reply('Spit on that thang!')
        }
    },
};