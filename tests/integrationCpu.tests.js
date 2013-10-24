var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var testUtils = require('./util/util');

describe('integrationCpu', function() {
    it('should run', function() {
        var clock = sinon.useFakeTimers();
        var piGlowMock = testUtils.createPiGlowMock();
        var callbackCalled = false;

        var piglowCpu = sandboxed.require('../lib/modules/cpu', {
            requires: {
                "piglow": testUtils.createCreateInterface(null, piGlowMock),
                "cputilization": testUtils.createCPUMock([0.1, 0.3, 0.5, 0.9])
            }
        });

        piglowCpu.start({interval: 1000, brightness: 23}, function() {
            callbackCalled = true;
        });

        clock.tick(1000);

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
            l_0_0: 0, l_0_1: 0, l_0_2: 7, l_0_3: 23, l_0_4: 23, l_0_5: 23,
            l_1_0: 0, l_1_1: 0, l_1_2: 7, l_1_3: 23, l_1_4: 23, l_1_5: 23,
            l_2_0: 0, l_2_1: 0, l_2_2: 7, l_2_3: 23, l_2_4: 23, l_2_5: 23
        });

        clock.tick(1000);

        expect(piGlowMock.data()).to.deep.equal( {
            l_0_0: 23, l_0_1: 23, l_0_2: 23, l_0_3: 23, l_0_4: 23, l_0_5: 23,
            l_1_0: 23, l_1_1: 23, l_1_2: 23, l_1_3: 23, l_1_4: 23, l_1_5: 23,
            l_2_0: 23, l_2_1: 23, l_2_2: 23, l_2_3: 23, l_2_4: 23, l_2_5: 23
        });

        expect(callbackCalled).to.be.true;

        clock.restore();
    });

    it('should fail', function(done) {
        var piglowCpu = sandboxed.require('../lib/modules/cpu', {
            requires: {
                "piglow": testUtils.createCreateInterface(new Error('foo')),
                "cputilization": testUtils.createCPUMock([0.1, 0.3, 0.5, 0.9])
            }
        });

        piglowCpu.start({interval: 1000, brightness: 23}, function(error) {
            expect(error).not.to.be.null;
            expect(error.message).to.equal('foo');

            done();
        });
    });
});
