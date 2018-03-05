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
    user, feature_togge_name, optional_param)
        .then(result => {
            ...
        }).catch(err => {
            ...
        })
        
ezeFeatureToggle.checkMultivalueJsonFeatureToggle(
    user, feature_togge_name, optional_param)
        .then(result => {
            ...
        }).catch(err => {
            ...
        })

```


NOTE: optional_param can be used to provide an additional attribute to be used as part of the rule evaluation criteria. It can be also used under an unauthentiated context where user attributes are not readily available. Values assigned can be evaluated as part of the rules configured using regex or other conditional operators.

            





