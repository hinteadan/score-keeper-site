(function (angular, k, _) {
	'use strict';

	function clearArray(a) {
		/// <param name='a' type='Array' />
		while (a.length) {
			a.pop();
		}
	}

	function ClashDetails(pointsToWin, firstToServe, firstToReceive) {
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
				this.firstToServe = _.find(memberPool, function (p) {
					return p.firstName === dto.firstToServe.firstName && p.lastName === dto.firstToServe.lastName;
				});
			}

			if (dto.firstToReceive) {
				this.firstToReceive = _.find(memberPool, function (p) {
					return p.firstName === dto.firstToReceive.firstName && p.lastName === dto.firstToReceive.lastName;
				});
			}
		};
	}

	function ClashService(ScoreProjector) {

		var parties = [
				new k.Party(),
				new k.Party()
		],
			clashDetails = new ClashDetails(),
			clashSet = null,
			projector = null;

		function ensureClashSet() {
			if (clashSet) {
				return;
			}
			clashSet = new k.ClashSet(
					_.map(_.range(0, clashDetails.setsToWin * 2 - 1, 1), function () { return new k.Clash(parties, clashDetails); }),
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
		this.ClashDetails = ClashDetails;
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
			if (this === dto) {
				return;
			}
			clearArray(parties);
			_.each(dto.parties, function (p) { parties.push(k.Party.revive(p)); });
			clashDetails.revive(dto.details, _.flatten(_.pluck(parties, 'individuals')));

		    if (dto.skClashSet) {
		        clashSet = k.ClashSet.revive(dto.skClashSet, parties, function () { return clashDetails; });
		        this.skClashSet = clashSet;
		        projector = new ScoreProjector(clashSet);
			}
		};
	}

	angular.module('ScoreKeeper.TableTennis')
		.service('Clash', ['ScoreProjector', ClashService]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);