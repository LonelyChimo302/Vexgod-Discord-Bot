// Listener for Client Interactions
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
    once: false,
	async execute(message) {

        var messagetext = message.content

        if (messagetext === "Hawk Tuah"){
            await message.reply('Spit on that thang!')
        } 
	},
};