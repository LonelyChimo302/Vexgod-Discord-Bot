const { Events } = require('discord.js');
const fs = require('@supercharge/fs');
const modch = '1122955244276568145';
const client = require("../index.js");

module.exports = {
	name: Events.GuildMemberRemove,
	once: false,
	async execute(member) {

        const username = member.displayName
        const userid = member.id
        const path = `./userfiles/${userid}`
        const exists = fs.existsSync(path)
		
        client.channels.cache.get(modch).send(`Der Nutzer **${username}** hat uns soeben verlassen oder wurde gekickt/gebannt. Nehmt das als Aufforderung ihn auch aus dem D2 Clan zu schmeißen, falls er dort Mitglied war.`)

        await fs.ensureDir(`./userfiles/${userid}`)

        if (exists === true) {
          await fs.emptyDir(path)
          await fs.remove(path)
        }
	},
};