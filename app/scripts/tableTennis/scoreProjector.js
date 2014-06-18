(function (angular, _) {
    'use strict';

    function ClashProjection() {
        this.scorePerPartyName = {};
        this.serving = null;
        this.receiving = null;
        this.isWon = false;
        this.winner = null;
    }

    function ClashScoreProjector(clash) {
        /// <param name="clash" type="H.ScoreKeeper.Clash" />

        function other(member, party) {
            if (party.individuals.length === 1) {
                return member;
            }
            return party.individuals[0] === member ? party.individuals[1] : party.individuals[0];
        }

        function projectWinnerOn(projection) {
            ///<param name="projection" type="Projection" />
            var partyOnePoints = clash.scoreFor(clash.parties[0]),
				partyTwoPoints = clash.scoreFor(clash.parties[1]);

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
        	var projection = new ClashProjection(),
				firstServingPartyIndex = _.contains(clash.parties[0].individuals, clash.details.firstToServe) ? 0 : 1,
				firstReceivingPartyIndex = firstServingPartyIndex === 0 ? 1 : 0,
				isTie = clash.scoreFor(clash.parties[0]) >= clash.details.pointsToWin - 1 &&
					clash.scoreFor(clash.parties[1]) >= clash.details.pointsToWin - 1,
				serveChangeOn = !isTie ? clash.details.serveChangeAfter : 1,
				currentServingPartyIndex = Math.floor(clash.points.length / serveChangeOn) % 2 === 0 ? firstServingPartyIndex : firstReceivingPartyIndex,
				currentReceivingPartyIndex = currentServingPartyIndex === 0 ? 1 : 0;

            projection.scorePerPartyName[clash.parties[0].name] = clash.scoreFor(clash.parties[0]);
            projection.scorePerPartyName[clash.parties[1].name] = clash.scoreFor(clash.parties[1]);

            switch (Math.floor(clash.points.length / serveChangeOn) % (clash.parties.length * clash.parties[0].individuals.length)) {
                case 0:
                    projection.serving = clash.details.firstToServe;
                    projection.receiving = clash.details.firstToReceive;
                    break;
                case 1:
                    projection.serving = clash.details.firstToReceive;
                    projection.receiving = other(clash.details.firstToServe, clash.parties[currentReceivingPartyIndex]);
                    break;
                case 2:
                    projection.serving = other(clash.details.firstToServe, clash.parties[currentServingPartyIndex]);
                    projection.receiving = other(clash.details.firstToReceive, clash.parties[currentReceivingPartyIndex]);
                    break;
                case 3:
                    projection.serving = other(clash.details.firstToReceive, clash.parties[currentServingPartyIndex]);
                    projection.receiving = clash.details.firstToServe;
                    break;
            }

            return projectWinnerOn(projection);
        }

        this.now = projectCurrentClashState;

    }
    ClashScoreProjector.ClashProjection = ClashProjection;

    function ClashSetProjection() {
    	this.scorePerPartyName = {};
    	this.isWon = false;
    	this.winner = null;
    	this.finalScore = [null,null];
		
    	/// <param type='ClashProjection' />
    	this.currentSet = null;
    }

    function ScoreProjector(clashSet) {
    	/// <param name="clashSet" type="H.ScoreKeeper.ClashSet" />

    	function projectWinner(projection) {
    		/// <param name="projection" type="ClashSetProjection" />

    		projection.winner = _.find(clashSet.parties, function (p) { return projection.scorePerPartyName[p.name] === clashSet.details.setsToWin; }) || null;
    		projection.isWon = projection.winner !== null;
    		if (projection.isWon) {
    			projection.finalScore[0] = projection.scorePerPartyName[projection.winner.name];
    			projection.finalScore[1] = projection.scorePerPartyName[projection.winner === clashSet.parties[0] ? clashSet.parties[1].name : clashSet.parties[0].name];
    		}
    	}

    	function projectCurrentState() {
    		var projection = new ClashSetProjection();

    		_.each(clashSet.parties, function (p) {
    			projection.scorePerPartyName[p.name] = clashSet.scoreFor(p);
    		});

    		projectWinner(projection);

    		projection.currentSet = new ClashScoreProjector(clashSet.activeClash() || _.last(clashSet.clashes)).now();

    		return projection;
    	}

    	this.now = projectCurrentState;
    }
    ScoreProjector.ClashProjection = ClashProjection;

    angular.module('ScoreKeeper.TableTennis').value('ScoreProjector', ScoreProjector);

}).call(this, this.angular, this._);