"use strict";

const chai = require('chai');
const expect = chai.expect;
const mockery = require('mockery');

before(() => {
    console.log('=== before() test');

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

describe("Boolean check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkBooleanFeatureToggle successfully", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarkly);
        const ldClient = require('../../index');
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkBooleanFeatureToggle(servicemock.mockRequest(true).User, 'workflowstatus-get-by-firmid')
                    .then(result => {
                        expect(result).to.equal(true);
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


describe("Multi-value check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkMultivalueFeatureToggle successfully", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarkly);
        const ldClient = require('../../index')
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkMultivalueFeatureToggle(servicemock.mockRequest(true).User, 'workflowstatus-option')
                    .then(result => {
                        expect(result).to.equal("get-by-workflowstatusid");
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

describe("Multi-value check in unauthenticated case", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkMultivalueFeatureToggle returning default value", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarkly);
        const ldClient = require('../../index')
        ldClient.init('dummyKey')
            .then(ezeFeatureToggle => {
                ezeFeatureToggle.checkMultivalueFeatureToggle(servicemock.mockRequest(false).User, 'workflowstatus-option',
                        'workflowstatus-get-by-firmid')
                    .then(result => {
                        expect(result).to.equal("workflowstatus-get-by-firmid");
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