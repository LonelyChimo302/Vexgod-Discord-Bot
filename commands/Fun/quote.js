const { SlashCommandBuilder } = require('discord.js');
const cooldown = new Set();
const cooldownTime = 10000;
const Canvas = require('canvas');
const fs = require('@supercharge/fs');
var today = new Date();
var year = today.getFullYear();

function addLineBreaks(input, interval) {
    let result = '';
    let currentLine = '';

    input.split(' ').forEach(word => {
        if ((currentLine + word).length > interval) {
            result += currentLine.trim() + '\n';
            currentLine = '';
        }
        currentLine += word + ' ';
    });

    result += currentLine.trim();
    return result;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Zitat-Generator')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Wen zitierst du?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('quote')
                .setDescription('Zitat')
                .setRequired(true)
        )
    ,
    async execute(interaction) {

        var quotetextraw = interaction.options.getString('quote')

        await interaction.deferReply();



        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");

        }

        else if (quotetextraw.length > 70) {
            await interaction.editReply('Zitat ist leider zu lang. Versuch es zu kürzen.')
        }

        else {

            var quotetext = addLineBreaks(quotetextraw, 30)

            var quotelines = quotetext.split('\n').length;

            var member = interaction.options.getMember('user');

            var avatarurl = member.displayAvatarURL({ extension: 'jpg' });

            var userid = interaction.options.getUser('user').id;

            var username = member.displayName

            var qusername = `~ ${username}, ${year}`

            const sSave = `./pictures/${userid}-quoted.png`;

            const canvas = Canvas.createCanvas(700, 250);

            const ctx = canvas.getContext('2d');

            const avatar = await Canvas.loadImage(avatarurl);

            const background = await Canvas.loadImage('./pictures/quotebg.jpg');

            Canvas.registerFont('./font/Barcelony.ttf', { family: "Barcelony" });

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            const applyText = (canvas, text) => {
                const context = canvas.getContext('2d');
                let fontSize = 47;

                do {
                    context.font = `${fontSize -= 10}px Barcelony`;
                } while (context.measureText(text).width > canvas.width - 250);

                return context.font;
            };

            ctx.font = applyText(canvas, quotetext);
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.textAlign = "center";

            if (quotelines === 1) {
                ctx.fillText(quotetext, canvas.width / 1.6, canvas.height / 2);
            }

            else if (quotelines === 2) {
                ctx.fillText(quotetext, canvas.width / 1.6, canvas.height / 2.2);
            }

            else if (quotelines === 3) {
                ctx.fillText(quotetext, canvas.width / 1.6, canvas.height / 3);
            }

            else { }

            ctx.font = '20px sans-serif';
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.textAlign = 'right'
            ctx.fillText(qusername, canvas.width / 1.01, canvas.height / 1.1);

            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);

            const out = fs.createWriteStream(sSave);
            const stream = canvas.createPNGStream();
            stream.pipe(out);

            await sleep(3000);

            await interaction.editReply({ content: `<@${userid}>`, files: [sSave] });

            await sleep(1000);

            await fs.remove(sSave);

            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
        }
    },
};