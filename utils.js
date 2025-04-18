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
    addLineBreaks,
    sleep
}