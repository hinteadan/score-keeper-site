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
		this.isValid = function () {
			return this.firstToServe && this.firstToReceive;
		};
	}

	function ClashService(ScoreProjector) {
		var parties = [
				new k.Party(),
				new k.Party()
			],
			clashDetails = new ClashDetails(),
			clash = null,
			projector = null;

		this.parties = parties;
		this.theOtherParty = function (currentParty) {
			return currentParty === parties[0] ? parties[1] : parties[0];
		};
		this.details = clashDetails;
		this.ClashDetails = ClashDetails;
		this.clash = function () {
			if (!clash) {
				clash = new k.Clash(parties, clashDetails);
			}
			this.skClash = clash;
			return clash;
		};
		this.projectScore = function () {
			if (!projector) {
				projector = new ScoreProjector(this.clash());
			}
			return projector;
		};

		this.restoreFromDto = function (dto) {
			clearArray(parties);
			angular.forEach(dto.parties, function (p) {
				var party = new k.Party(p.name);
				angular.forEach(p.individuals, function (m) {
					party.addMember(new k.Individual(m.firstName, m.lastName));
				});
				parties.push(party);
			});
			for (var p in dto.details) {
				clashDetails[p] = dto.details[p];
			}
			clash = new k.Clash(parties, clashDetails);
			this.skClash = clash;
			angular.forEach(dto.skClash.points, function (point) {
				var party = _.find(parties, { name: point.party.name });
				clash.pointWith(point.details).for(party);
				_.last(clash.points).timestamp = point.timestamp;
			});
		};
	}

	angular.module('ScoreKeeper.TableTennis')
		.service('Clash', ['ScoreProjector', ClashService]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);