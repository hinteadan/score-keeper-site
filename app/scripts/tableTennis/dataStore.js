(function (angular, ds, _) {
    'use strict';
    
    function Metadata() {
        this.teamA = '';
        this.teamB = '';
        this.playersCsv = '';
        this.winner = '';

        this.winningNotes = null;

        this.setsToWin = 0;
        this.setsPlayed = 0;
        this.pointsPlayed = 0;

        this.createdOn = null;
        this.startedOn = null;
        this.endedOn = null;
    }

    angular.module('ScoreKeeper.TableTennis')
    .service('DataStore', ['$q', 'Clash', function ($q, clash) {
        var store = new ds.Store('ScoreKeeperTableTennisClashes', 'http://h-httpstore.azurewebsites.net/');

        function playersCsv(){
            return _.pluck(_.flatten(_.pluck(clash.parties, 'individuals')), function(m){
                ///<param name='m' type='H.ScoreKeeper.Individual' />
                return m.fullName().replace(/\,/g, '.');
            }).join(',');
        }

        function pointsPlayed(){
            return _.reduce(clash.clashSet().clashes, function (sum, c) {
                ///<param name='c' type='H.ScoreKeeper.Clash' />
                return sum + c.points.length;
            }, 0);
        }

        function extractMetaData() {
            var m = new Metadata();
            m.teamA = clash.parties[0].name;
            m.teamB = clash.parties[1].name;
            m.playersCsv = playersCsv();
            m.winner = clash.clashSet().winner().name;
            m.winningNotes = (clash.clashSet().activeClash() || _.last(clash.clashSet().clashes)).winnerNotes;
            m.setsToWin = clash.details.setsToWin;
            m.setsPlayed = clash.clashSet().clashes.length;
            m.pointsPlayed = pointsPlayed();
            m.createdOn = clash.details.createdOn;
            m.startedOn = clash.details.startedOn;
            m.endedOn = clash.details.endedOn;
            return m;
        }

        this.commit = function () {
            var deferred = $q.defer();

            store.Save(new ds.Entity(clash.clashSet(), extractMetaData())).then(function (result) {
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

}).call(this, this.angular, this.H.DataStore, this._);