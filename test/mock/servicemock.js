const mockRequest = function (useSession, firmId, parameters, body, query) {
    var req = {
        url: "myUrl",
        User: {
            UserSession: {
                FirmId: 38,
                FirmName: "TestFirm",
                FirmAuthToken: "TC9MF",
                UserId: 1,
                UserName: "testUserName",
                UserSessionToken: "09368290_0c7ef0693c4d5c89",
                EnvironmentName: "DEV"
            }
        }
    };
    if (!useSession) {
        return req;
    }

    if (firmId) {
        req.User.UserSession.FirmId = firmId;
    }

    if (body) {
        req.body = body;
    }

    req.query = query || {};

    return req;
};


const mockLaunchDarkly = {
    init: function (sdkKey) {
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
        console.log(`@@@@@@@ mockLaunchDarkly invoked @@@@@`);
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
        return mockLdClient;

    }
}

const mockLaunchDarklyNegative = {
    init: function (sdkKey) {
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
        console.log(`@@@@@@@ mockLaunchDarklyNegative invoked @@@@@`);
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
        return mockLdClientNegative;
    }
}

const mockLdClient = {
    once: function (state, cb) {
        if (state === 'ready') {
            return cb()
        }
    },

    variation: function (featureToggle, key, def, cb) {
        if (featureToggle == 'workflowstatus-get-by-firmid') {
            cb(null, true);
        } else {
            cb(null, {
                key: 'get-by-workflowstatusid'
            });
        }
    }
}

const mockLdClientNegative = {
    once: function (state, cb) {
        if (state === 'error') {
            return cb('error occurred')
        }
    },

    variation: function (featureToggle, key, def, cb) {
        if (featureToggle === 'workflowstatus-get-by-firmid') {
            cb(null, false);
        } else {
            cb('error returned', null);
        }
    }
}


module.exports = {
    mockRequest,
    mockLaunchDarkly,
    mockLaunchDarklyNegative
};