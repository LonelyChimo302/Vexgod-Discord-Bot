'use strict';

var expect = require('chai').expect;
var msToTimecode = require('../index');

describe('#numFormatter', function() {
    it('timecode conversion', function() {
        var result = msToTimecode(90000, 30);
        expect(result).to.equal('00:01:30:00');
    });

    it('frame conversion', function() {
        var result = msToTimecode(100, 10);
        expect(result).to.equal('00:00:00:01');
    });

    it('hour conversion', function() {
        var result = msToTimecode(3600000, 10);
        expect(result).to.equal('01:00:00:00');
    });

    it('more than 10 hour conversion', function() {
        var result = msToTimecode(36000000, 10);
        expect(result).to.equal('10:00:00:00');
    });

    it('more than 10 minutes conversion', function() {
        var result = msToTimecode(600000, 10);
        expect(result).to.equal('00:10:00:00');
    });


    it('more than 10 frames conversion', function() {
        var result = msToTimecode(500, 20);
        expect(result).to.equal('00:00:00:10');
    });
});