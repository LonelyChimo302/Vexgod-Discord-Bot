// Listener for Client Interactions
const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        var messagetext = message.content

        if (messagetext.toLowerCase().includes("hawk tuah") && message.author.id === "282082952026783744") {
            await message.reply('Spit on that Florian!')
        }
        else if (messagetext.toLowerCase().includes("hawk tuah")) {
            await message.reply('Spit on that thang!')
        }
    },
};