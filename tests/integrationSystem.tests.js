var expect = require('chai').expect;
var sinon = require('sinon');
var sandboxed = require('sandboxed-module');

var testUtils = require('./util/util');

describe('integrationSystem', function() {

    it('should run', function() {
        var clock = sinon.useFakeTimers();
        var callback = sinon.stub();

        var systemMock = testUtils.createSystemMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                '../../index': systemMock
            }
        });

        piglowSystem.start({}, callback);

        clock.tick(30000);

        expect(callback.callCount).to.equal(1);

        expect(systemMock.cpu.start.callCount).to.equal(1);
        expect(systemMock.load.start.callCount).to.equal(2);
        expect(systemMock.cpu.stop.callCount).to.equal(1);
        expect(systemMock.load.stop.callCount).to.equal(1);

        clock.restore();
    });

    it('should run with a switchInterval', function() {
        var clock = sinon.useFakeTimers();
        var callback = sinon.stub();

        var systemMock = testUtils.createSystemMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                '../../index': systemMock
            }
        });

        piglowSystem.start({switchInterval:5000}, callback);

        clock.tick(30000);

        expect(callback.callCount).to.equal(1);

        expect(systemMock.cpu.start.callCount).to.equal(3);
        expect(systemMock.load.start.callCount).to.equal(3);
        expect(systemMock.cpu.stop.callCount).to.equal(2);
        expect(systemMock.load.stop.callCount).to.equal(3);

        clock.restore();
    });

    it('should run with a pauseInterval', function() {
        var clock = sinon.useFakeTimers();
        var callback = sinon.stub();

        var systemMock = testUtils.createSystemMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                '../../index': systemMock
            }
        });

        piglowSystem.start({pause: 5000}, callback);

        clock.tick(20000);

        expect(callback.callCount).to.equal(1);

        expect(systemMock.cpu.start.callCount).to.equal(1);
        expect(systemMock.load.start.callCount).to.equal(1);
        expect(systemMock.cpu.stop.callCount).to.equal(0);
        expect(systemMock.load.stop.callCount).to.equal(1);

        clock.restore();
    });

    it('should run and stop', function() {
        var clock = sinon.useFakeTimers();
        var callbackStart = sinon.stub();
        var callbackStop = sinon.stub();

        var systemMock = testUtils.createSystemMock();

        var piglowSystem = sandboxed.require('../lib/modules/system', {
            requires: {
                '../../index': systemMock
            }
        });

        piglowSystem.start({pause: 5000}, callbackStart);

        clock.tick(20000);

        piglowSystem.stop(callbackStop);

        expect(callbackStart.callCount).to.equal(1);
        expect(callbackStop.callCount).to.equal(1);

        expect(systemMock.cpu.start.callCount).to.equal(1);
        expect(systemMock.load.start.callCount).to.equal(1);
        expect(systemMock.cpu.stop.callCount).to.equal(1);
        expect(systemMock.load.stop.callCount).to.equal(1);

        clock.restore();
    });
});
