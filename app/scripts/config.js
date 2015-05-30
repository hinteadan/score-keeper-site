(function (ng) {
    'use strict';

    var appConfig = {
        storeUrl: 'http://localhost/HttpDataStore/'
    };

    if (ng) {
        ng.module('appConfig', ['ng'])
            .value('appConfig', appConfig);
    }

    this.appConfig = appConfig;

}).call(this, this.angular);