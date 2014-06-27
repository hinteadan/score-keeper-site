(function (angular, k) {
	'use strict';

	var inject = angular.injector(['ScoreKeeper.TableTennis', 'ngRoute']),
		ScoreProjector = inject.get('ScoreProjector'),
		clashService = inject.get('Clash'),
		parties = null,
		clash = null,
		projector = null;

	function projectionForOneSetOk(scoreA, scoreB, serving, receiving) {
		var p = projector.now().currentSet;
		expect(p.scorePerPartyName[clash.parties[0].name]).toEqual(scoreA);
		expect(p.scorePerPartyName[clash.parties[1].name]).toEqual(scoreB);
		expect(p.serving).toBe(serving);
		expect(p.receiving).toBe(receiving);
	}

	function projectionForOneSetWonBy(party) {
		var p = projector.now().currentSet;
		expect(p.isWon).toBe(true);
		expect(p.winner).toBe(party);
	}

	function projectionForSetsOk(scoreA, scoreB) {
		var p = projector.now();
		expect(p.scorePerPartyName[clash[0].parties[0].name]).toEqual(scoreA);
		expect(p.scorePerPartyName[clash[0].parties[1].name]).toEqual(scoreB);
	}

	function projectionForSetsWonBy(party) {
		var p = projector.now();
		expect(p.isWon).toBe(true);
		expect(p.winner).toBe(party);
	}

	function score(count) {
	    var n = count || 1;
		return {
			for: function (party) {
				for (var i = 0; i < n; i++) {
					clash.pointFor(party);
				}
			}
		};
	}

	describe('Table Tennis scoring', function () {

		it('uses inject-ables', function () {
			expect(ScoreProjector).toBeDefined();
			expect(clashService).toBeDefined();
		});

		describe('For one set of Doubles', function () {

			beforeEach(function () {
				parties = [
				    new k.Party('Team Awesome').addMembers([new k.Individual('Hintea', 'Dan'), new k.Individual('Pascalau', 'Anca')]),
				    new k.Party('Team D&G').addMembers([new k.Individual('Pacurar', 'Georgiana'), new k.Individual('Mis', 'Diana Alina')])
				];
				clash = new k.Clash(parties, new clashService.ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]));
				projector = new ScoreProjector(new k.ClashSet([clash], parties, clash.details));
			});

			it('initially projects according to clash definition', function () {
				projectionForOneSetOk(0, 0, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when 1 point is scored', function () {
				score().for(clash.parties[0]);
				projectionForOneSetOk(1, 0, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when 4 points are scored', function () {
				score(3).for(clash.parties[0]);
				score(1).for(clash.parties[1]);

				projectionForOneSetOk(3, 1, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when 5 points are scored', function () {
				score(3).for(clash.parties[0]);
				score(2).for(clash.parties[1]);

				projectionForOneSetOk(3, 2, parties[1].individuals[0], parties[0].individuals[1]);
			});

			it('projects correctly when 10 points are scored', function () {
				score(6).for(clash.parties[0]);
				score(4).for(clash.parties[1]);

				projectionForOneSetOk(6, 4, parties[0].individuals[1], parties[1].individuals[1]);
			});

			it('projects correctly when playing on tie-break', function () {
				score(10).for(clash.parties[0]);
				score(10).for(clash.parties[1]);
				projectionForOneSetOk(10, 10, parties[0].individuals[0], parties[1].individuals[0]);
				score().for(clash.parties[0]);
				projectionForOneSetOk(11, 10, parties[1].individuals[0], parties[0].individuals[1]);
				score().for(clash.parties[1]);
				projectionForOneSetOk(11, 11, parties[0].individuals[1], parties[1].individuals[1]);
				score().for(clash.parties[1]);
				projectionForOneSetOk(11, 12, parties[1].individuals[1], parties[0].individuals[0]);
				score().for(clash.parties[1]);
				projectionForOneSetOk(11, 13, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly on straight win', function () {
				score(11).for(clash.parties[0]);
				projectionForOneSetWonBy(clash.parties[0]);
			});

			it('projects correctly when winning on tie-break', function () {
				score(10).for(clash.parties[0]);
				score(11).for(clash.parties[1]);
				expect(projector.now().currentSet.isWon).toBe(false);
				score().for(clash.parties[0]);
				expect(projector.now().currentSet.isWon).toBe(false);
				score(2).for(clash.parties[1]);
				projectionForOneSetWonBy(clash.parties[1]);
			});

		});

		describe('For one set of Singles', function () {

			beforeEach(function () {
				parties = [
					new k.Party('Team Hintea').addMembers([new k.Individual('Hintea', 'Dan')]),
					new k.Party('Team Gicu').addMembers([new k.Individual('Orian', 'Georgian')])
				];
				clash = new k.Clash(parties, new clashService.ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]));
				projector = new ScoreProjector(new k.ClashSet([clash], parties, clash.details));
			});

			it('initially projects according to clash definition', function () {
				projectionForOneSetOk(0, 0, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when 1 point is scored', function () {
				score().for(clash.parties[0]);
				projectionForOneSetOk(1, 0, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when 4 points are scored', function () {
				score(3).for(clash.parties[0]);
				score(1).for(clash.parties[1]);

				projectionForOneSetOk(3, 1, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when 5 points are scored', function () {
				score(3).for(clash.parties[0]);
				score(2).for(clash.parties[1]);

				projectionForOneSetOk(3, 2, parties[1].individuals[0], parties[0].individuals[0]);
			});

			it('projects correctly when 10 points are scored', function () {
				score(6).for(clash.parties[0]);
				score(4).for(clash.parties[1]);

				projectionForOneSetOk(6, 4, parties[0].individuals[0], parties[1].individuals[0]);
			});

			it('projects correctly when playing on tie-break', function () {
				score(10).for(clash.parties[0]);
				score(10).for(clash.parties[1]);
				projectionForOneSetOk(10, 10, parties[0].individuals[0], parties[1].individuals[0]);
				score().for(clash.parties[0]);
				projectionForOneSetOk(11, 10, parties[1].individuals[0], parties[0].individuals[0]);
				score().for(clash.parties[1]);
				projectionForOneSetOk(11, 11, parties[0].individuals[0], parties[1].individuals[0]);
				score().for(clash.parties[1]);
				projectionForOneSetOk(11, 12, parties[1].individuals[0], parties[0].individuals[0]);
				score().for(clash.parties[1]);
				projectionForOneSetOk(11, 13, parties[0].individuals[0], parties[1].individuals[0]);
			});

		});

		describe('For multiple sets', function () {
			beforeEach(function () {
				parties = [
				    new k.Party('Team Awesome').addMembers([new k.Individual('Hintea', 'Dan'), new k.Individual('Pascalau', 'Anca')]),
				    new k.Party('Team D&G').addMembers([new k.Individual('Pacurar', 'Georgiana'), new k.Individual('Mis', 'Diana Alina')])
				];
				var clashDetails = new clashService.ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]);
				clashDetails.setsToWin = 2;
				clash = [
					new k.Clash(parties, clashDetails),
					new k.Clash(parties, clashDetails),
					new k.Clash(parties, clashDetails)
				];

				projector = new ScoreProjector(new k.ClashSet(clash, parties, clashDetails));
			});

			it('initially projects to 0-0', function () {
				projectionForSetsOk(0, 0);
			});

			it('initially projects no winner', function () {
				expect(projector.now().isWon).toBe(false);
				expect(projector.now().winner).toBeNull();
			});

			it('increments score for party when it wins a set', function () {
				clash[0].close(parties[0]);
				projectionForSetsOk(1, 0);
				clash[1].close(parties[1]);
				projectionForSetsOk(1, 1);
			});

			it('ends and projects the winner as the party who first reached the setsToWin goal', function () {
				clash[0].close(parties[0]);
				clash[1].close(parties[1]);
				clash[2].close(parties[0]);
				projectionForSetsWonBy(parties[0]);
			});

			it('ends and projects the winner if less than maximum number of sets are played (bagel win)', function () {
				clash[0].close(parties[1]);
				clash[1].close(parties[1]);
				projectionForSetsWonBy(parties[1]);
			});
		});

	});

}).call(this, this.angular, this.H.ScoreKeeper);