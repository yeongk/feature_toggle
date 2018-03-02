"use strict";

const chai = require('chai');
const expect = chai.expect;
const mockery = require('mockery');

before(() => {
    console.log('=== before on test.negative');

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
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegative);
        const ezeFeatureToggle = require('../../index')
        ezeFeatureToggle.checkBooleanFeatureToggle(servicemock.mockRequest().User, 'workflowstatus-get-by-firmid')
            .then(result => {
                expect(result).to.equal(false);
            });

        done();
    })
});
describe("Multi-value check", function () {
    const servicemock = require("../mock/servicemock");

    it("should run checkBooleanFeatureToggle successfully", function (done) {

        mockery.resetCache();
        mockery.registerMock('ldclient-node', servicemock.mockLaunchDarklyNegative);
        const ezeFeatureToggle = require('../../index')
        ezeFeatureToggle.checkMultivalueJsonFeatureToggle(servicemock.mockRequest().User, 'workflowstatus-option',
                'param6')
            .then(result => {
                expect(result.key).to.equal('get-by-workflowstatusid');
            });

        done();
    })
});