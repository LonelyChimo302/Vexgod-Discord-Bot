import { convert2img } from "mdimg";

await convert2img({
    mdFile: "./CHANGELOG.md",
    outputFilename: "./pictures/Changelog.png",
    width: 2000,
    cssTemplate: "githubDark",
});

await convert2img({
    mdFile: "./COMMANDLIST.md",
    outputFilename: "./pictures/Commandlist.png",
    width: 2000,
    cssTemplate: "githubDark",
});