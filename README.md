# Eze Feature Toggle
===================================================

This package handles the checking of feature toggles using LaunchDarkly (https://docs.launchdarkly.com/docs). Creation and updates of Feature toggles as well as rules settings and configurations are managed via LaunchDarkly dashboard. 


## Prerequisites

Node.js version 6.10.1 or later version. Confirm by running `node -v`



## To include feature toggle package to your app


```
npm i  https://github.com/yeongk/feature_toggle.git --save
```


This package exports two methods:

```
    checkBooleanFeatureToggle()
    checkMultivalueFeatureToggle()

```


## checking toggles in your app

```
const ezeFeatureToggle = require("eze-feature-toggle");

ezeFeatureToggle.checkBooleanFeatureToggle(
    user, feature_togge_name, def_value)
        .then(result => {
            ...
        }).catch(err => {
            ...
        })
        
ezeFeatureToggle.checkMultivalueFeatureToggle(
    user, feature_togge_name, def_value)
        .then(result => {
            ...
        }).catch(err => {
            ...
        })

```


NOTE: def_value is used as a fall-back option. It is used as the return value if an error is encountered, e.g., if the service is unavailable or the specified feature toggle key doesn't exist. def_value is also returned as the return value in the unauthenticated use case.

            





