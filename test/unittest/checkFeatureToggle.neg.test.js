"use strict";

const chai = require('chai');
const expect = chai.expect;
const mockery = require('mockery');

before(() => {
    console.log('=== before() test.negative');

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });

});

after(() => {
    mockery.disable();
    mockery.deregisterAll();
});


describe("Boolean Negative check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkBooleanFeatureToggle with ld-unavailable false", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegativeReady);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkBooleanFeatureToggle(servicemock.mockRequest(true).User, 'workflowstatus-get-by-firmid')
                    .then(result => {
                        expect(result).to.equal(false);
                    })
                    .catch(err => {
                        console.log(`err: ${err}`)
                    });

            })
            .catch(err => {
                console.log(`err:${err}`)
            })

        done();
    })
});

describe("Boolean Negative check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkBooleanFeatureToggle with error return", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegativeVariation);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkBooleanFeatureToggle(servicemock.mockRequest(true).User, 'workflowstatus-get-by-firmid')
                    .then(result => {
                        expect(result).to.equal(false);
                    })
                    .catch(err => {
                        console.log(`err: ${err}`)
                    });

            })
            .catch(err => {
                console.log(`err:${err}`)
            })

        done();
    })
});

describe("Boolean Negative check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkBooleanFeatureToggle with unauthenticated user", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegativeVariation);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkBooleanFeatureToggle(servicemock.mockRequest(false).User, 'workflowstatus-get-by-firmid')
                    .then(result => {
                        expect(result).to.equal(false);
                    })
                    .catch(err => {
                        console.log(`err: ${err}`)
                    });

            })
            .catch(err => {
                console.log(`err:${err}`)
            })

        done();
    })
});

describe("Multi-value check under unauthenticated case", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkMultivalueFeatureToggle with unauthenticated user", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarkly);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkMultivalueFeatureToggle(servicemock.mockRequest(false).User, 'workflowstatus-option',
                        'param6')
                    .then(result => {
                        expect(result).to.equal('param6');
                    })
                    .catch(err => {
                        console.log(`err: ${err}`)
                    });

            })
            .catch(err => {
                console.log(`err:${err}`)
            })

        done();
    })
});

describe("Multi-value check with error return", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkMultivalueFeatureToggle with default value returned", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegativeVariation);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkMultivalueFeatureToggle(servicemock.mockRequest(true).User, 'workflowstatus-option',
                        'param6')
                    .then(result => {
                        expect(result).to.equal('param6');
                    })
                    .catch(err => {
                        console.log(`err: ${err}`)
                    });

            })
            .catch(err => {
                console.log(`err:${err}`)
            })

        done();
    })
});

describe("Multi-value check with ld-unavailable", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkMultivalueFeatureToggle with default value returned", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegativeReady);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkMultivalueFeatureToggle(servicemock.mockRequest(true).User, 'workflowstatus-option',
                        'param6')
                    .then(result => {
                        expect(result).to.equal('param6');
                    })
                    .catch(err => {
                        console.log(`err: ${err}`)
                    });

            })
            .catch(err => {
                console.log(`err:${err}`)
            })

        done();
    })
});