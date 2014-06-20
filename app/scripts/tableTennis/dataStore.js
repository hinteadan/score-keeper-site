(function (angular, ds) {
    'use strict';
    
    angular.module('ScoreKeeper.TableTennis')
    .service('DataStore', ['$q', 'Clash', function ($q, clash) {
        var store = new ds.Store('ScoreKeeperTableTennisClashes', 'http://h-httpstore.azurewebsites.net/');

        this.commit = function () {
            var deferred = $q.defer();

            store.Save(new ds.Entity(clash.clashSet())).then(function (result) {
                /// <param name='result' type='ds.OperationResult' />
                if (!result.isSuccess) {
                    deferred.reject(result.reason);
                    return;
                }
                deferred.resolve(result.data.Id);
            });

            return deferred.promise;
        };

    }]);

}).call(this, this.angular, this.H.DataStore);