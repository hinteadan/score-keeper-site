(function (angular, _) {
	'use strict';

	function Projection() {
		this.scorePerPartyName = {};
		this.serving = null;
		this.receiving = null;
		this.isWon = false;
		this.winner = null;
	}

	function ScoreProjector(clash) {
		/// <param name="clash" type="H.ScoreKeeper.Clash" />
		
		function other(member, party) {
			if (party.individuals.length === 1) {
				return member;
			}
			return party.individuals[0] === member ? party.individuals[1] : party.individuals[0];
		}

		function projectWinnerOn(projection) {
			///<param name="projection" type="Projection" />
			var partyOnePoints = clash.pointsFor(clash.parties[0]).length,
				partyTwoPoints = clash.pointsFor(clash.parties[1]).length;

			projection.isWon = false;
			projection.winner = null;

			if (partyOnePoints >= clash.details.pointsToWin && partyOnePoints - partyTwoPoints >= 2) {
				projection.isWon = true;
				projection.winner = clash.parties[0];
				return projection;
			}
			if (partyTwoPoints >= clash.details.pointsToWin && partyTwoPoints - partyOnePoints >= 2) {
				projection.isWon = true;
				projection.winner = clash.parties[1];
				return projection;
			}
			return projection;
		}

		function projectCurrentClashState() {
			var projection = new Projection(),
				firstServingPartyIndex = _.contains(clash.parties[0].individuals, clash.details.firstToServe) ? 0 : 1,
				firstReceivingPartyIndex = firstServingPartyIndex === 0 ? 1 : 0,
				isTie = clash.pointsFor(clash.parties[0]).length >= clash.details.pointsToWin - 1
					&& clash.pointsFor(clash.parties[1]).length >= clash.details.pointsToWin - 1,
				serveChangeOn = !isTie ? clash.details.serveChangeAfter : 1,
				currentServingPartyIndex = Math.floor(clash.points.length / serveChangeOn) % 2 === 0 ? firstServingPartyIndex : firstReceivingPartyIndex,
				currentReceivingPartyIndex = currentServingPartyIndex === 0 ? 1 : 0;

			projection.scorePerPartyName[clash.parties[0].name] = clash.pointsFor(clash.parties[0]).length;
			projection.scorePerPartyName[clash.parties[1].name] = clash.pointsFor(clash.parties[1]).length;

			switch (Math.floor(clash.points.length / serveChangeOn) % (clash.parties.length * clash.parties[0].individuals.length)) {
				case 0:
					projection.serving = clash.details.firstToServe;
					projection.receiving = clash.points.length % 2 === 0
						? clash.details.firstToReceive
						: other(clash.details.firstToReceive, clash.parties[currentReceivingPartyIndex]);
					break;
				case 1:
					projection.serving = clash.details.firstToReceive;
					projection.receiving = clash.points.length % 2 !== 0
						? other(clash.details.firstToServe, clash.parties[currentReceivingPartyIndex])
						: clash.details.firstToServe;
					break;
				case 2:
					projection.serving = other(clash.details.firstToServe, clash.parties[currentServingPartyIndex]);
					projection.receiving = clash.points.length % 2 === 0
						? other(clash.details.firstToReceive, clash.parties[currentReceivingPartyIndex])
						: clash.details.firstToReceive;
					break;
				case 3:
					projection.serving = other(clash.details.firstToReceive, clash.parties[currentServingPartyIndex]);
					projection.receiving = clash.points.length % 2 !== 0
						? clash.details.firstToServe
						: other(clash.details.firstToServe, clash.parties[currentReceivingPartyIndex]);
					break;
			}

			return projectWinnerOn(projection);
		}

		this.now = projectCurrentClashState;

	}
	ScoreProjector.Projection = Projection;

	angular.module('ScoreKeeper.TableTennis').value('ScoreProjector', ScoreProjector);

}).call(this, this.angular, this._);