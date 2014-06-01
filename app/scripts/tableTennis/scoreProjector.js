(function (angular) {
	'use strict';

	function Projection() {
		this.scorePerPartyName = {};
		this.serving = null;
		this.receiving = null;
	}

	function ScoreProjector(clash) {
		/// <param name="clash" type="H.ScoreKeeper.Clash" />
		


	}
	ScoreProjector.Projection = Projection;

	angular.module('ScoreKeeper.TableTennis').value('ScoreProjector', ScoreProjector);

}).call(this, this.angular);