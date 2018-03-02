"use strict";

const chai = require('chai');
const expect = chai.expect;
const mockery = require('mockery');

before(() => {
    console.log('=== before on test');

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
        const ezeFeatureToggle = require('../../index')
        ezeFeatureToggle.checkBooleanFeatureToggle(servicemock.mockRequest().User, 'workflowstatus-get-by-firmid')
            .then(result => {
                expect(result).to.equal(true);
            });

        done();
    })
});
describe("Multi-value check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkMultivalueJsonFeatureToggle successfully", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarkly);
        const ezeFeatureToggle = require('../../index')
        ezeFeatureToggle.checkMultivalueJsonFeatureToggle(servicemock.mockRequest().User, 'workflowstatus-option',
                'param6')
            .then(result => {
                expect(result.key).to.equal('get-by-workflowstatusid');
            });

        done();
    })
});