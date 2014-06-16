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
			clash = null,
			clashSet = null,
			projector = null;

		this.parties = parties;
		this.theOtherParty = function (currentParty) {
			return currentParty === parties[0] ? parties[1] : parties[0];
		};
		this.details = clashDetails;
		this.ClashDetails = ClashDetails;
		this.clashSet = function () {
			if (!clashSet) {
				clashSet = new k.ClashSet(
					_.map(_.range(0, clashDetails.setsToWin, 1), function () { return new k.Clash(parties, clashDetails); }),
					parties, clashDetails);
			}
			this.skClashSet = clashSet;
			return clashSet;
		};
		this.clash = function () {
			if (!clash) {
				clash = new k.Clash(parties, clashDetails);
			}
			this.skClash = clash;
			return clash;
		};
		this.projectScore = function () {
			if (!projector) {
				projector = new ScoreProjector(this.clashSet());
			}
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
		    angular.forEach(dto.parties, function (p) { parties.push(k.Party.revive(p)); });
		    clashDetails.revive(dto.details, _.flatten(_.pluck(parties, 'individuals')));
		    if (dto.skClash) {
		        clash = k.Clash.revive(dto.skClash, parties, function () { return clashDetails; });
		        this.skClash = clash;
		        projector = null;
		    }
		};
	}

	angular.module('ScoreKeeper.TableTennis')
		.service('Clash', ['ScoreProjector', ClashService]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);