// Listener for Client Interactions
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
    once: false,
	async execute(message) {

        var messagetext = message.content

        if (messagetext === "Hawk Tuah" && message.author.id === "282082952026783744"){
            await message.reply('Spit on that Florian!')
        }
        else if (messagetext === "Hawk Tuah"){
            await message.reply('Spit on that thang!')
        }
	},
};