(function (angular, ds, _, sk, deserializeDates) {
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

    function PersistenceToken(id, check) {
        var self = this;
        this.id = id || null;
        this.check = check || null;

        this.update = function (id, check) {
            self.id = id;
            self.check = check;
        };

        this.isPersisted = function () {
            return self.id && self.check;
        };
    }

    function PersistentClashSet(persistenceToken, clashSet) {
        this.persistence = persistenceToken;
        this.clashSet = clashSet;
    }

    angular.module('ScoreKeeper.TableTennis')
    .value('PersistenceToken', PersistenceToken)
    .service('DataStore', ['$q', 'appConfig', 'Clash', function ($q, cfg, clash) {
        var store = new ds.Store('ScoreKeeperTableTennisClashes', cfg.storeUrl);

        function playersCsv() {
            return _.pluck(_.flatten(_.pluck(clash.parties, 'individuals')), function (m) {
                ///<param name='m' type='H.ScoreKeeper.Individual' />
                return m.fullName().replace(/\,/g, '.');
            }).join(',');
        }

        function pointsPlayed() {
            return _.reduce(clash.clashSet().clashes, function (sum, c) {
                ///<param name='c' type='H.ScoreKeeper.Clash' />
                return sum + c.points.length;
            }, 0);
        }

        function extractMetaData() {
            var m = new Metadata(),
                winner = clash.clashSet().winner();
            m.teamA = clash.parties[0].name;
            m.teamB = clash.parties[1].name;
            m.playersCsv = playersCsv();
            m.isWon = Boolean(winner);
            m.winner = winner ? winner.name : m.winner;
            m.winningNotes = (clash.clashSet().activeClash() || _.last(clash.clashSet().clashes)).winnerNotes;
            m.setsToWin = clash.details.setsToWin;
            m.setsPlayed = _.where(clash.clashSet().clashes, function (c) { return c.hasEnded(); }).length;
            m.pointsPlayed = pointsPlayed();
            m.createdOn = clash.details.createdOn;
            m.startedOn = clash.details.startedOn;
            m.endedOn = clash.details.endedOn;
            m.hasEnded = Boolean(clash.details.endedOn);
            return m;
        }

        function mapEntity(entity) {
            /// <param name='entity' type='ds.Entity' />
            return new PersistentClashSet(new PersistenceToken(entity.Id, entity.CheckTag), sk.ClashSet.revive(deserializeDates(entity.Data)));
        }

        this.persist = function () {
            var deferred = $q.defer(),
                entity = new ds.Entity(clash.clashSet(), extractMetaData());

            if (clash.persistence.id) {
                entity.Id = clash.persistence.id;
                entity.CheckTag = clash.persistence.check;
            }

            store.Save(entity).then(function (result) {
                /// <param name='result' type='ds.OperationResult' />
                if (!result.isSuccess) {
                    deferred.reject(result.reason);
                    return;
                }
                clash.persistence.update(result.data.Id, result.data.CheckTag);
                deferred.resolve(entity);
            });

            return deferred.promise;
        };

        this.liveNow = function () {
            var query = ds.queryWithAnd().where('hasEnded')(ds.is.EqualTo)(false),
                deff = $q.defer();

            store.Query(query).then(function (result) {
                /// <param name='result' type='ds.OperationResult' />
                if (!result.isSuccess) {
                    deff.reject(result.reason);
                }
                deff.resolve(result.data);
            });

            return deff.promise;
        };

        this.load = function (id) {
            var deff = $q.defer();

            store.Load(id).then(function (result) {
                /// <param name='result' type='ds.OperationResult' />
                if (!result.isSuccess) {
                    deff.reject(result.reason);
                }
                deff.resolve(mapEntity(result.data));
            });

            return deff.promise;
        };

    }]);

}).call(this, this.angular, this.H.DataStore, this._, this.H.ScoreKeeper, this.storage.deserializeDates);