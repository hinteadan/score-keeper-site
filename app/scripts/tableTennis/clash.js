(function (angular, k, _) {
    'use strict';

    function clearArray(a) {
        /// <param name='a' type='Array' />
        while (a.length) {
            a.pop();
        }
    }

    function ClashDetails(firstToServe, firstToReceive) {
        this.firstToServe = firstToServe;
        this.firstToReceive = firstToReceive;
    }

    function ClashSetDetails(pointsToWin, firstToServe, firstToReceive) {
        this.pointsToWin = pointsToWin || 21;
        this.firstToServe = firstToServe;
        this.firstToReceive = firstToReceive;
        this.serveChangeAfter = 5;
        this.setsToWin = 4;

        this.createdOn = new Date();
        this.startedOn = null;
        this.endedOn = null;

        this.isValid = function () {
            return this.firstToServe && this.firstToReceive;
        };
        this.hasBegun = function () {
            return this.startedOn !== null;
        };
        this.hasEnded = function () {
            return this.endedOn !== null;
        };
        this.revive = function (dto, memberPool) {
            for (var property in dto) {
                this[property] = dto[property];
            }

            if (dto.firstToServe) {
                this.firstToServe = _.find(memberPool, function (p) { return p.isMatching(dto.firstToServe); });
            }

            if (dto.firstToReceive) {
                this.firstToReceive = _.find(memberPool, function (p) { return p.isMatching(dto.firstToReceive); });
            }
        };
    }

    function ClashService(ScoreProjector) {

        var parties = [
				new k.Party(),
				new k.Party()
        ],
			clashDetails = new ClashSetDetails(),
			clashSet = null,
			projector = null;

        function ensureClashSet() {
            if (clashSet) {
                return;
            }
            var evenClashDetails = new ClashDetails(clashDetails.firstToServe, clashDetails.firstToReceive),
		        oddClashDetails = new ClashDetails(clashDetails.firstToReceive, clashDetails.firstToServe),
		        details = [evenClashDetails, oddClashDetails];

            clashSet = new k.ClashSet(
					_.map(_.range(0, clashDetails.setsToWin * 2 - 1, 1), function (i) { return new k.Clash(parties, details[i % 2]); }),
					parties,
					clashDetails
				);
        }

        function ensureScoreProjector() {
            ensureClashSet();
            if (projector) {
                return;
            }
            projector = new ScoreProjector(clashSet);
        }

        this.parties = parties;
        this.theOtherParty = function (currentParty) {
            return currentParty === parties[0] ? parties[1] : parties[0];
        };
        this.details = clashDetails;
        this.ClashDetails = ClashSetDetails;
        this.clashSet = function () {
            ensureClashSet();
            this.skClashSet = clashSet;
            return clashSet;
        };

        this.projectScore = function () {
            ensureScoreProjector();
            return projector;
        };
        this.play = function () {
            clashDetails.startedOn = new Date();
        };
        this.stop = function () {
            clashDetails.endedOn = new Date();
        };

        this.revive = function (dto) {
            var memberPool = [];
            if (this === dto) {
                return;
            }
            clearArray(parties);
            _.each(dto.parties, function (p) { parties.push(k.Party.revive(p)); });
            memberPool = _.flatten(_.pluck(parties, 'individuals'));
            clashDetails.revive(dto.details, memberPool);

            if (dto.skClashSet) {
                clashSet = k.ClashSet.revive(dto.skClashSet, parties,
                    function () { return clashDetails; },
                    function (dto) {
                        return new ClashDetails(
                            _.find(memberPool, function (m) { return m.isMatching(dto.firstToServe); }),
                            _.find(memberPool, function (m) { return m.isMatching(dto.firstToReceive); })
                            );
                    });
                this.skClashSet = clashSet;
                projector = new ScoreProjector(clashSet);
            }
        };
    }

    angular.module('ScoreKeeper.TableTennis')
		.service('Clash', ['ScoreProjector', ClashService]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);