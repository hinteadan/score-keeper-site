(function (angular, ds, Realtime) {
    'use strict';

    angular.module('ScoreKeeper.Common')
    .service('realtime', ['$q', 'appConfig', function ($q, cfg) {

        var realtimeService = new Realtime.Service(cfg.storeUrl),
            /// <var type="Realtime.Api" />
            api = null,
            defferedApi = $q.defer();

        function isConnected() {
            return api !== null;
        }

        realtimeService.bind().then(function (realtimeApi) {
            /// <param name="realtimeApi" type="Realtime.Api" />
            api = realtimeApi;
            defferedApi.resolve(api);
        });

        this.bind = function () {
            return isConnected() ? $q.when(api) : defferedApi.promise;
        };

    }]);

}).call(this, this.angular, this.H.DataStore, this.H.DataStore.Realtime);