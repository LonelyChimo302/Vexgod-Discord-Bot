const utils = require('../../utils.js')

const { SlashCommandBuilder } = require('discord.js');

const fs = require('@supercharge/fs');

const cooldown = new Set();

const cooldownTime = 10000;

const { registerFont, createCanvas, loadImage } = require('canvas');


async function deepFryEffect(inputPath, outputPath) {
    const image = await loadImage(inputPath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Originalbild auf die Leinwand zeichnen
    ctx.drawImage(image, 0, 0);

    // Bilddaten abrufen
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Farben gleichmäßig übersättigen
        data[i] = Math.min(255, data[i] * 1.8);     // Rotkanal
        data[i + 1] = Math.min(255, data[i + 1] * 1.8); // Grünkanal
        data[i + 2] = Math.min(255, data[i + 2] * 1.8); // Blaukanal

        // Kontrast erhöhen
        data[i] = Math.min(255, (data[i] - 128) * 2 + 128);
        data[i + 1] = Math.min(255, (data[i + 1] - 128) * 2 + 128);
        data[i + 2] = Math.min(255, (data[i + 2] - 128) * 2 + 128);

        // JPEG-Artefakt-Simulation (leichte Verzerrung)
        if (Math.random() > 0.95) {
            data[i] = data[i + 1] = data[i + 2] = Math.random() * 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Das Bild als JPEG speichern
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createJPEGStream({ quality: 0.2 });
    stream.pipe(out);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Caption ein Bild mit Top- und Bottomtext oder Tieffritiere es. Oder beides.')
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Das Bild was gecaptioned werden soll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('deepfry')
                .setDescription('Deepfry?')
                .setRequired(true)
                .addChoices(
                    { name: 'Ja', value: 'true' },
                    { name: 'Nein', value: 'false' }
                ))
        .addStringOption(option =>
            option.setName('toptext')
                .setDescription('Der Toptext')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('bottomtext')
                .setDescription('Der Bottomtext')
                .setRequired(false)),

    async execute(interaction) {
        try {

            await interaction.deferReply();

            var topraw = interaction.options.getString('toptext')

            if (topraw === null) {
                var topraw = ''
            }

            var bottomraw = interaction.options.getString('bottomtext')

            if (bottomraw === null) {
                var bottomraw = ''
            }

            var userid = interaction.member.id

            var file = interaction.options.getAttachment('image')

            var filetype = file.contentType

            var imgurl = file.url

            var deepfry = interaction.options.getString('deepfry')

            if (cooldown.has(interaction.user.id)) {
                interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            }

            else if (bottomraw.length > 77 || topraw.length > 77) {
                await interaction.editReply('Einer oder beide Texte sind zu lang. Versuch ihn zu kürzen.')
            }

            else if (filetype.includes('webp') || filetype.includes('gif')) {
                await interaction.editReply('Nein. webp und gif akzeptieren wir hier nicht.')
            }


            else if (filetype.includes('image')) {

                var top = utils.addLineBreaks(topraw, 25);

                var bottom = utils.addLineBreaks(bottomraw, 25);

                var bottomLines = bottom.split('\n').length;

                var sImage = `${imgurl}`;

                var sSave = `./pictures/${userid}-captioned.png`;

                var deepfryout = `./pictures/${userid}-deepfried.png`;

                registerFont('./font/19927_impact.ttf', { family: "Impact Condensed" });

                if (topraw.length === 0 && bottomraw.length === 0 && deepfry === 'false') {
                    interaction.editReply('Wenn du es nicht verändern willst, lad das Bild doch selbst hoch lol.')
                }

                else if (topraw.length === 0 && bottomraw.length === 0 && deepfry === 'true') {

                    var sImage = `${imgurl}`;

                    var sSave = `./pictures/${userid}-captioned.png`;

                    var deepfryout = `./pictures/${userid}-deepfried.png`;

                    loadImage(sImage).then(img => {

                        const canvas = createCanvas(1000, 1000);
                        const ctx = canvas.getContext('2d');

                        ctx.drawImage(img, 0, 0, 1000, 1000);

                        const out = fs.createWriteStream(sSave);
                        const stream = canvas.createPNGStream();

                        stream.pipe(out);
                    })

                    await utils.sleep(5000);

                    deepFryEffect(sSave, deepfryout)

                    await utils.sleep(5000);

                    await interaction.editReply({ content: null, files: [`${deepfryout}`] });

                    await fs.remove(`${sSave}`)

                    await fs.remove(`${deepfryout}`)

                    cooldown.add(interaction.user.id);
                    setTimeout(() => {
                        cooldown.delete(interaction.user.id);
                    }, cooldownTime);

                }

                else if (topraw.length > 0 || bottomraw.length > 0) {

                    loadImage(sImage).then(img => {

                        const canvas = createCanvas(1000, 1000);
                        const ctx = canvas.getContext('2d');

                        ctx.drawImage(img, 0, 0, 1000, 1000);

                        ctx.font = '72px Impact';
                        ctx.fillStyle = "rgb(255, 255, 255)";
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = "rgb(0, 0, 0)";

                        let toptd = ctx.measureText(top);
                        let toptw = toptd.width;
                        let topth = toptd.actualBoundingBoxAscent + toptd.actualBoundingBoxDescent;

                        let bottd = ctx.measureText(bottom);
                        let bottw = bottd.width;
                        let botth = bottd.actualBoundingBoxAscent + bottd.actualBoundingBoxDescent;

                        let topx = Math.floor((1000 - toptw) / 2);
                        let topy = Math.floor((1000 + topth) / 12);
                        ctx.strokeText(top, topx, topy);
                        ctx.fillText(top, topx, topy);

                        if (bottomLines === 1) {
                            let botx = Math.floor((1000 - bottw) / 2);
                            let boty = Math.floor((1000 + botth) - 100);
                            ctx.strokeText(bottom, botx, boty);
                            ctx.fillText(bottom, botx, boty);
                        }

                        else if (bottomLines === 2) {
                            let botx = Math.floor((1000 - bottw) / 2);
                            let boty = Math.floor((1000 + botth) - 250);
                            ctx.strokeText(bottom, botx, boty);
                            ctx.fillText(bottom, botx, boty);
                        }

                        else if (bottomLines === 3) {
                            let botx = Math.floor((1000 - bottw) / 2);
                            let boty = Math.floor((1000 + botth) - 450);
                            ctx.strokeText(bottom, botx, boty);
                            ctx.fillText(bottom, botx, boty);
                        }
                        else {

                        }

                        const out = fs.createWriteStream(sSave);
                        const stream = canvas.createPNGStream();

                        stream.pipe(out);

                    })

                    if (deepfry === 'true') {

                        await utils.sleep(5000);

                        deepFryEffect(sSave, deepfryout)

                        await utils.sleep(5000);

                        await interaction.editReply({ content: null, files: [`${deepfryout}`] });

                        await fs.remove(`${sSave}`)

                        await fs.remove(`${deepfryout}`)

                        cooldown.add(interaction.user.id);
                        setTimeout(() => {
                            cooldown.delete(interaction.user.id);
                        }, cooldownTime);

                    }

                    else {

                        await utils.sleep(5000);

                        await interaction.editReply({ content: null, files: [`${sSave}`] });

                        await fs.remove(`${sSave}`)

                        cooldown.add(interaction.user.id);
                        setTimeout(() => {
                            cooldown.delete(interaction.user.id);
                        }, cooldownTime);
                    }
                }

            }

            else if (!filetype.includes('image')) {
                interaction.editReply('Das ist kein Bild, falls doch, dann nicht in einem gängigen Format wie jpeg oder png.')
                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, cooldownTime);
            }
        }
        catch (error) {

        }
    }
}