Milliseconds to Timecode
=========

[![Build Status](https://travis-ci.org/jenglamlow/ms-to-timecode.svg?branch=master)](https://travis-ci.org/jenglamlow/ms-to-timecode)
[![Coverage Status](https://coveralls.io/repos/github/jenglamlow/ms-to-timecode/badge.svg?branch=master)](https://coveralls.io/github/jenglamlow/ms-to-timecode?branch=master)

A small library to convert millisecond to hh:mm:ss:ff time code

## Installation

  `npm install ms-to-timecode`

## Usage

    var msToTimecode = require('ms-to-timecode');

    var timecodeString = msToTimecode(90000, 30);
  
  
  Output should be `00:01:30:00`


## Tests

  `npm test`
