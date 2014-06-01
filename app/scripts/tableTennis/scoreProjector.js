(function (angular) {
	'use strict';

	function Projection() {
		this.scorePerPartyName = {};
		this.serving = null;
		this.receiving = null;
	}

	function ScoreProjector(clash) {
		/// <param name="clash" type="H.ScoreKeeper.Clash" />
		
		function projectCurrentClashState() {
			var projection = new Projection();

			angular.forEach(clash.parties, function (party) {
				/// <param name="party" type="H.ScoreKeeper.Party" />
				projection.scorePerPartyName[party.name] = 0;
			});
			projection.serving = clash.details.firstToServe;
			projection.receiving = clash.details.firstToReceive;

			return projection;
		}

		this.now = projectCurrentClashState;

	}
	ScoreProjector.Projection = Projection;

	angular.module('ScoreKeeper.TableTennis').value('ScoreProjector', ScoreProjector);

}).call(this, this.angular);