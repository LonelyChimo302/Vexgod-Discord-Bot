'use strict';

/**
 * Adds commas to a number
 * @param {number} ms Milliseconds
 * @param {number} fps Frames per second
 * @return {string}
 */
module.exports = function(ms, fps) {
    let frames = parseInt((ms/1000 * fps) % fps)
    let seconds = parseInt((ms/1000)%60)
    let minutes = parseInt((ms/(1000*60))%60)
    let hours = parseInt((ms/(1000*60*60))%24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    frames = (frames < 10) ? "0" + frames : frames;
  
    return hours + ":" + minutes + ":" + seconds + ":" + frames;
};