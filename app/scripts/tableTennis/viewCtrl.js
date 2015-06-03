(function (angular, _) {
    'use strict';

    angular.module('ScoreKeeper.TableTennis')
    .controller('view', ['$scope', '$routeParams', '$location', 'realtime', 'ScoreProjector', 'DataStore', function ($s, $p, $l, realtime, ScoreProjector, repo) {

        var ProjectionType = ScoreProjector.ClashSetProjection,// jshint ignore:line
            clashId = $p.id;

        function refreshView(score) {
            /// <param name="score" type="ProjectionType" />
            $s.parties = _.map(score.scorePerPartyName, function (s, k) { return k; });
            $s.isWon = score.isWon;
            $s.winner = score.winner;
            $s.score = score.currentSet.scorePerPartyName;
            $s.setScore = score.scorePerPartyName;
            $s.serving = score.isWon ? null : score.currentSet.serving;

            $s.columnsCss = columCssClass($s.parties.length);
        }

        function columCssClass(numberOfParties) {
            if (numberOfParties === 0) {
                return 'col-xs-12';
            }
            if (numberOfParties >= 12) {
                return 'col-xs-1';
            }
            return 'col-xs-' + (Math.floor(12 / numberOfParties));
        }

        function initialize() {
            if (!clashId) {
                repo.liveNow().then(function (entities) {
                    $s.liveClashes = entities;
                });
                return;
            }

            repo.load(clashId).then(function (persistentClashSet) {
                refreshView(new ScoreProjector(persistentClashSet.clashSet).now());
            });

            realtime.bind().then(function (api) {
                /// <param name="api" type="H.DataStore.Realtime.Api" />
                api.setOnChangeHandler(function (payload) {
                    /// <param name="payload" type="H.DataStore.Entity" />
                    if (payload.Id !== clashId) {
                        return;
                    }
                    refreshView(payload.Data);
                    $s.$apply();
                });
            });
        }

        $s.clashId = clashId;
        $s.liveClashes = [];
        $s.view = function (id) {
            $l.path('/view/' + id);
        };

        initialize();

    }]);

}).call(this, this.angular, this._);