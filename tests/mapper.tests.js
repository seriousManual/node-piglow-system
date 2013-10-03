var expect = require('chai').expect;
var testUtils = require('./util/util');

var mapper = require('../lib/mapper');

describe('mapper', function() {

    it('should set LEDs 0.11', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.1, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 0, l_0_5: 6,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.11, arm 2', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(1, 0.1, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 0, l_0_5: 0,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 6,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.11, arm 3', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(2, 0.1, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 0, l_0_5: 0,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 6
        });
    });

    it('should set LEDs 0.31', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.31, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 10, l_0_5: 10,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.46', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.5, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 0, l_0_1: 0, l_0_2: 3, l_0_3: 10, l_0_4: 10, l_0_5: 10,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.61', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.7, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 0, l_0_1: 6, l_0_2: 10, l_0_3: 10, l_0_4: 10, l_0_5: 10,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.76', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.79, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 2, l_0_1: 10, l_0_2: 10, l_0_3: 10, l_0_4: 10, l_0_5: 10,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.86', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.86, 10, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 7, l_0_1: 10, l_0_2: 10, l_0_3: 10, l_0_4: 10, l_0_5: 10,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });

    it('should set LEDs 0.86, modified brightness', function() {
        var piGlowMock = testUtils.createPiGlowMock();
        mapper(0, 0.86, 100, piGlowMock);

        expect(piGlowMock.data()).to.deep.equal({
            l_0_0: 73, l_0_1: 100, l_0_2: 100, l_0_3: 100, l_0_4: 100, l_0_5: 100,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 0,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 0
        });
    });
});