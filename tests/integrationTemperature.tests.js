var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var testUtils = require('./util/util');

describe('integrationTemperature', function() {

    it('should run', function() {
        var clock = sinon.useFakeTimers();
        var piGlowMock = testUtils.createPiGlowMock();

        var Module = sandboxed.require('../lib/modules/Module', {
            requires: {
                "piglow": testUtils.createCreateInterface()
            }
        });

        var Temperature = sandboxed.require('../lib/modules/Temperature', {
            requires: {
                "./Module": Module,
                "fs": testUtils.createFSMock(null, [10000, 30000, 60000, 90000])
            }
        });

        var myTemperature = new Temperature(piGlowMock, {interval: 1000, brightness: 23});

        myTemperature.start();

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 0, l_0_5: 15,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 0, l_1_5: 15,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 0, l_2_5: 15
        });

        clock.tick(1000);

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 0, l_0_1: 0, l_0_2: 0, l_0_3: 0, l_0_4: 23, l_0_5: 23,
            l_1_0: 0, l_1_1: 0, l_1_2: 0, l_1_3: 0, l_1_4: 23, l_1_5: 23,
            l_2_0: 0, l_2_1: 0, l_2_2: 0, l_2_3: 0, l_2_4: 23, l_2_5: 23
        });

        clock.tick(1000);

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 0, l_0_1: 0, l_0_2: 23, l_0_3: 23, l_0_4: 23, l_0_5: 23,
            l_1_0: 0, l_1_1: 0, l_1_2: 23, l_1_3: 23, l_1_4: 23, l_1_5: 23,
            l_2_0: 0, l_2_1: 0, l_2_2: 23, l_2_3: 23, l_2_4: 23, l_2_5: 23
        });

        clock.restore();
    });
});
