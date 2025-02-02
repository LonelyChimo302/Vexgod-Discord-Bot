// Jede Nachricht die vom Nutzer Florian geschrieben wird wird mit einem bestimmten Emote reacted.

// Auf Wunsch von Jona

// Nicht Changelog-tauglich

const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        const emote = '1174702859221205043'

        if (message.author.id === 282082952026783744) {
            message.react(emote)
        }
    }
}