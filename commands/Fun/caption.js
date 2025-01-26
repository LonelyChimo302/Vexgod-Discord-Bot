const { SlashCommandBuilder } = require('discord.js');

const fs = require('@supercharge/fs');

const cooldown = new Set();

const cooldownTime = 10000; 

const { registerFont ,createCanvas, loadImage } = require('canvas');

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
                .setRequired(true)),


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

        await fs.ensureDir(`./userfiles/${userid}/`)

        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            interaction.editReply("Brudi du bist noch auf Cooldown, warte bitte.");
            
          }
        
          
        else if ( bottom.length > 77 || top.length > 77) {
            await interaction.editReply('Einer oder beide Texte sind zu lang. Versuch ihn zu kürzen.')
        }

        else if (filetype.includes('webp') === true) {
            await interaction.editReply('Nein. Webp aktzeptieren wir hier nicht')
        }


        else if (filetype.includes('image') === true) {

            var sImage = `${imgurl}`;

            var sSave = `./userfiles/${userid}/${userid}-captioned.png`;

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

            await sleep(5000);
  
            await interaction.editReply({ content: null, files: [`${sSave}`] });

            await fs.remove(`${sSave}`)

            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);
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