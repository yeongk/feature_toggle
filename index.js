const ezeFeatureToggle = require('./lib/init');

function checkBooleanFeatureToggle(user, featureToggle, def) {
    let defValue = def ? def : false;
    if (!ezeFeatureToggle.ldAvailable) {
        return Promise.resolve(defValue);
    }

    return new Promise((resolve, reject) => {
        if (!user) {
            resolve(defValue)
        } else {
            ezeFeatureToggle.ldClient.variation(featureToggle, getKey(user), defValue,
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
}

function checkMultivalueFeatureToggle(user, featureToggle, def) {
    let defValue = def ? def : "";
    if (!ezeFeatureToggle.ldAvailable) {
        return Promise.resolve(defValue);
    }

    return new Promise((resolve, reject) => {
        if (!user) {
            resolve(defValue)
        } else {
            ezeFeatureToggle.ldClient.variation(featureToggle, getKey(user), defValue,
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

function getKey(user) {

    return {
        key: (user.UserSession.FirmAuthToken + '-' + user.UserSession.UserName).toUpperCase(),
        custom: {
            environment: user.UserSession.EnvironmentName,
            firmColor: user.FirmColor
        }
    }
}

module.exports = {
    checkBooleanFeatureToggle,
    checkMultivalueFeatureToggle
}