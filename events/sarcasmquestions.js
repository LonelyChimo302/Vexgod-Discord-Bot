const { Events } = require('discord.js')
const cooldowns = new Map();

function randomCase(text) {
    return text.split('').map(char =>
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
    ).join('');
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        if (message.author.bot) return;

        const serverId = message.guild.id;
        const now = Date.now();
        const cooldownTime = 15 * 1000;

        if (cooldowns.has(serverId)) {
            const lastUsed = cooldowns.get(serverId);
            if (now - lastUsed < cooldownTime) return;
        }


        let text = message.content;
        const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
        let textWithoutLinks = text.replace(linkRegex, '');
        const match = textWithoutLinks.match(/[^?.!]*\?/);

        if (match) {
            const question = match[0].trim();
            const sarcasmtext = randomCase(question);
            await message.reply(sarcasmtext);

            cooldowns.set(serverId, now);

            setTimeout(() => cooldowns.delete(serverId), cooldownTime);
        }
    }
}