(function (angular, _) {
	'use strict';

	function Projection() {
		this.scorePerPartyName = {};
		this.serving = null;
		this.receiving = null;
	}

	function ScoreProjector(clash) {
		/// <param name="clash" type="H.ScoreKeeper.Clash" />
		
		function projectCurrentClashState() {
			var projection = new Projection(),
				firstReceivingParty = null;

			angular.forEach(clash.parties, function (party) {
				/// <param name="party" type="H.ScoreKeeper.Party" />
				projection.scorePerPartyName[party.name] = clash.pointsFor(party).length;
				if (firstReceivingParty === null && _.contains(party.individuals, clash.details.firstToReceive)) {
					firstReceivingParty = party;
				};
			});
			projection.serving = clash.details.firstToServe;
			projection.receiving = clash.points.length % clash.parties[0].individuals.length === 0 
				? clash.details.firstToReceive 
				: _.find(firstReceivingParty.individuals, function (i) { return i !== clash.details.firstToReceive; });

			return projection;
		}

		this.now = projectCurrentClashState;

	}
	ScoreProjector.Projection = Projection;

	angular.module('ScoreKeeper.TableTennis').value('ScoreProjector', ScoreProjector);

}).call(this, this.angular, this._);