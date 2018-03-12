const LaunchDarkly = require('ldclient-node');

let ldClient = {};

const ezeFeatureToggle = {
    checkBooleanFeatureToggle: function (user, featureToggle, def) {
        let defValue = def ? def : false;

        return new Promise((resolve, reject) => {
            if (!user) {
                resolve(defValue)
            } else {
                ldClient.variation(featureToggle, getKey(user), defValue,
                    (err, res) => {
                        if (err) {
                            resolve(defValue)
                        } else {
                            if (res) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }
                    });
            }

        });
    },

    checkMultivalueFeatureToggle: function (user, featureToggle, def) {
        let defValue = def ? def : "";

        return new Promise((resolve, reject) => {
            if (!user) {
                resolve(defValue)
            } else {
                ldClient.variation(featureToggle, getKey(user), defValue,
                    (err, res) => {
                        if (err) {
                            resolve(defValue)
                        } else {
                            if (res) {
                                resolve(res);
                            } else {
                                resolve("");
                            }
                        }
                    });
            }
        });
    }
}

function init(sdkKey) {
    return new Promise((resolve, reject) => {
        ldClient = LaunchDarkly.init(sdkKey);
        ldClient.waitUntilReady()
            .then(() => {
                resolve(ezeFeatureToggle)
            })
            .catch(err => {
                reject(err)
            })
    })
}


function getKey(user) {

    return {
        key: (user.UserSession.FirmAuthToken + '-' + user.UserSession.UserName).toUpperCase(),
        custom: {
            firmAuthToken: user.UserSession.FirmAuthToken,
            environment: user.UserSession.EnvironmentName,
            firmColor: user.FirmColor
        }
    }
}

module.exports = {
    init
}