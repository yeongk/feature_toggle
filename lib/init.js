const LaunchDarkly = require('ldclient-node');
const env = require('node-env-file');
env(__dirname + '/../.env', {
    overwrite: true
});

/**
 * Initalize launch darkly and returns the singleton client
 */
const ezeFeatureToggle = ((key) => {

    this.instance = 1;

    this.ldAvailable = false;
    this.ldClient = LaunchDarkly.init(key);
    console.log('LaunchDarkly client initialized');

    this.ldClient.once('ready', () => {
        this.ldAvailable = true;
    });
    this.ldClient.once('error', (err) => {
        console.error(err);
    })

    return this;

})(process.env.LD_SDK_KEY);

module.exports = ezeFeatureToggle;