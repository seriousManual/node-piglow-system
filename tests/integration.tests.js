var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var testUtils = require('./util/util');

describe('integration', function() {

    it('should run', function() {
        var clock = sinon.useFakeTimers();
        var piGlowMock = testUtils.createPiGlowMock();

        var piglowLoad = sandboxed.require('../lib/modules/load', {
            requires: {
                "piglow": testUtils.createCreateInterface(null, piGlowMock),
                "os": testUtils.createOsMock([
                    [0.11, 0.31, 0.46],
                    [0.31, 0.46, 0.61],
                    [0.46, 0.61, 0.76]
                ])
            }
        });

        piglowLoad.start({interval: 1000, brightness: 23});

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 0, l_0_5: 16,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 1, l_1_4: 23, l_1_5: 23,
            l_2_0: 0, l_2_1: 0, l_2_2: 1, l_2_3: 23, l_2_4: 23, l_2_5: 23
        });

        clock.tick(1000);

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 1, l_0_4: 23, l_0_5: 23,
            l_1_0: 0, l_1_1: 0, l_1_2: 1, l_1_3: 23, l_1_4: 23, l_1_5: 23,
            l_2_0: 0, l_2_1: 1, l_2_2: 23, l_2_3: 23, l_2_4: 23, l_2_5: 23
        });

        clock.tick(1000);

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 0, l_0_1: 0, l_0_2: 1, l_0_3: 23, l_0_4: 23, l_0_5: 23,
            l_1_0: 0, l_1_1: 1, l_1_2: 23, l_1_3: 23, l_1_4: 23, l_1_5: 23,
            l_2_0: 1, l_2_1: 23, l_2_2: 23, l_2_3: 23, l_2_4: 23, l_2_5: 23
        });

        clock.restore();
    });

});
