const { SlashCommandBuilder } = require('discord.js');

const fs = require('@supercharge/fs');

const cooldown = new Set();

const cooldownTime = 10000; 

const { registerFont ,createCanvas, loadImage } = require('canvas');


async function deepFryEffect(inputPath, outputPath) {
    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');

    // Hintergrundbild laden
    const image = await loadImage(inputPath);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Bilddaten extrahieren
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Deepfry-Farbeffekte anwenden
    for (let i = 0; i < data.length; i += 4) {
        // Verstärkte Farben
        data[i] = Math.min(255, data[i] * 3); // Rot
        data[i + 1] = Math.min(255, data[i + 1] * 2.5); // Grün
        data[i + 2] = Math.min(255, data[i + 2] * 3); // Blau

        // Helle Stellen überbetonen
        if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
        }

        // Hinzufügen von starkem Rauschen
        const noise = Math.random() * 150 - 75; // ±75
        data[i] = Math.min(255, Math.max(0, data[i] + noise)); // Rot
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // Grün
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // Blau
    }

    // Geänderte Bilddaten zurücksetzen
    ctx.putImageData(imageData, 0, 0);

    // Starke Vignette hinzufügen
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width / 3,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.1
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Intensives Schärfen hinzufügen (kein echter Filter hier, aber als Pseudo-Effekt machbar)
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ergebnis speichern
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Deepfry-Bild wurde gespeichert: ${outputPath}`);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caption')
		.setDescription('Caption ein Bild mit Top- und Bottomtext')
        .setDMPermission(false)
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Das Bild was gecaptioned werden soll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('toptext')
                .setDescription('Der Toptext')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('bottomtext')
                .setDescription('Der Bottomtext')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('deepfry')
                .setDescription('Deepfry?')
                .setRequired(true)
                .addChoices(
                    { name: 'Ja', value: 'true'},
                    { name: 'Nein', value: 'false'}
                )),

	async execute(interaction) {
try {

        await interaction.deferReply();

        const topraw = interaction.options.getString('toptext')

        const top = addLineBreaks(topraw, 25)

        const bottomraw = interaction.options.getString('bottomtext')

        const bottom = addLineBreaks(bottomraw, 25)

        const bottomLines = bottom.split('\n').length;
        
        const userid = interaction.member.id

        const file = interaction.options.getAttachment('image')

        const filetype = file.contentType

        const imgurl = file.url

        const deepfry = interaction.options.getString('deepfry')


        await fs.ensureDir(`./userfiles/${userid}/`)

        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            
          }
        
          
        else if ( bottom.length > 77 || top.length > 77) {
            await interaction.editReply('Einer oder beide Texte sind zu lang. Versuch ihn zu kürzen.')
        }

        else if (filetype.includes('webp') === true) {
            await interaction.editReply('Nein. Webp akzeptieren wir hier nicht.')
        }


        else if (filetype.includes('image') === true) {

            var sImage = `${imgurl}`;

            var sSave = `./userfiles/${userid}/${userid}-captioned.png`;

            var deepfryout = `./userfiles/${userid}/${userid}-deepfried.png`;

            registerFont('./font/19927_impact.ttf', { family: "Impact Condensed" });

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

                if ( bottomLines === 1) {
                let botx = Math.floor((1000 - bottw) / 2);
                let boty = Math.floor((1000 + botth) - 100);
                ctx.strokeText(bottom, botx, boty);
                ctx.fillText(bottom, botx, boty);
                }
                
                else if ( bottomLines === 2) {
                let botx = Math.floor((1000 - bottw) / 2);
                let boty = Math.floor((1000 + botth) - 250);
                ctx.strokeText(bottom, botx, boty);
                ctx.fillText(bottom, botx, boty);
                }

                else if ( bottomLines === 3) {
                    let botx = Math.floor((1000 - bottw) / 2);
                    let boty = Math.floor((1000 + botth) - 450);
                    ctx.strokeText(bottom, botx, boty);
                    ctx.fillText(bottom, botx, boty);
                    }

                const out = fs.createWriteStream(sSave);
                const stream = canvas.createPNGStream();

                stream.pipe(out);

            })

            if ( deepfry === 'true' ) {

                await sleep(5000);

                deepFryEffect(sSave, deepfryout)

                await sleep(5000);
  
                await interaction.editReply({ content: null, files: [`${deepfryout}`] });

                await fs.remove(`${sSave}`)

                await fs.remove(`${deepfryout}`)

                cooldown.add(interaction.user.id);
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, cooldownTime);

            }
            
            else {

                await sleep(5000);
  
                await interaction.editReply({ content: null, files: [`${sSave}`] });

                await fs.remove(`${sSave}`)

                cooldown.add(interaction.user.id);
                    setTimeout(() => {
                        cooldown.delete(interaction.user.id);
                    }, cooldownTime);
        }
        }

        else if (filetype.includes('image') === false){
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