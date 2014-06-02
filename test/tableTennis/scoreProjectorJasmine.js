(function (angular, k, _) {
    'use strict';

    var inject = angular.injector(['ScoreKeeper.TableTennis', 'ngRoute']),
		ScoreProjector = inject.get('ScoreProjector'),
		clashService = inject.get('Clash'),
		parties = null,
		clash = null,
		projector = null;

    function projectionOk(scoreA, scoreB, serving, receiving) {
        var p = projector.now();
        expect(p.scorePerPartyName[clash.parties[0].name]).toEqual(scoreA);
        expect(p.scorePerPartyName[clash.parties[1].name]).toEqual(scoreB);
        expect(p.serving).toBe(serving);
        expect(p.receiving).toBe(receiving);
    }

    function projectionWonBy(party) {
        var p = projector.now();
        expect(p.isWon).toBe(true);
        expect(p.winner).toBe(party);
    }

    function score(n) {
        var n = n || 1;
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

        describe('For Doubles', function () {

            beforeEach(function () {
                parties = [
				    new k.Party('Team Awesome').addMembers([new k.Individual('Hintea', 'Dan'), new k.Individual('Pascalau', 'Anca')]),
				    new k.Party('Team D&G').addMembers([new k.Individual('Pacurar', 'Georgiana'), new k.Individual('Mis', 'Diana Alina')])
                ];
                clash = new k.Clash(parties, new clashService.ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]));
                projector = new ScoreProjector(clash);
            });

            it('initially projects according to clash definition', function () {
                projectionOk(0, 0, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when 1 point is scored', function () {
                score().for(clash.parties[0]);
                projectionOk(1, 0, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when 4 points are scored', function () {
                score(3).for(clash.parties[0]);
                score(1).for(clash.parties[1]);

                projectionOk(3, 1, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when 5 points are scored', function () {
                score(3).for(clash.parties[0]);
                score(2).for(clash.parties[1]);

                projectionOk(3, 2, parties[1].individuals[0], parties[0].individuals[1]);
            });

            it('projects correctly when 10 points are scored', function () {
                score(6).for(clash.parties[0]);
                score(4).for(clash.parties[1]);

                projectionOk(6, 4, parties[0].individuals[1], parties[1].individuals[1]);
            });

            it('projects correctly when playing on tie-break', function () {
                score(10).for(clash.parties[0]);
                score(10).for(clash.parties[1]);
                projectionOk(10, 10, parties[0].individuals[0], parties[1].individuals[0]);
                score().for(clash.parties[0]);
                projectionOk(11, 10, parties[1].individuals[0], parties[0].individuals[1]);
                score().for(clash.parties[1]);
                projectionOk(11, 11, parties[0].individuals[1], parties[1].individuals[1]);
                score().for(clash.parties[1]);
                projectionOk(11, 12, parties[1].individuals[1], parties[0].individuals[0]);
                score().for(clash.parties[1]);
                projectionOk(11, 13, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly on straight win', function () {
                score(11).for(clash.parties[0]);
                projectionWonBy(clash.parties[0]);
            });

            it('projects correctly when winning on tie-break', function () {
                score(10).for(clash.parties[0]);
                score(11).for(clash.parties[1]);
                expect(projector.now().isWon).toBe(false);
                score().for(clash.parties[0]);
                expect(projector.now().isWon).toBe(false);
                score(2).for(clash.parties[1]);
                projectionWonBy(clash.parties[1]);
            });

        });

        describe('For Singles', function () {

            beforeEach(function () {
                parties = [
				new k.Party('Team Hintea').addMembers([new k.Individual('Hintea', 'Dan')]),
				new k.Party('Team Gicu').addMembers([new k.Individual('Orian', 'Georgian')])
                ];
                clash = new k.Clash(parties, new clashService.ClashDetails(11, parties[0].individuals[0], parties[1].individuals[0]));
                projector = new ScoreProjector(clash);
            });

            it('initially projects according to clash definition', function () {
                projectionOk(0, 0, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when 1 point is scored', function () {
                score().for(clash.parties[0]);
                projectionOk(1, 0, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when 4 points are scored', function () {
                score(3).for(clash.parties[0]);
                score(1).for(clash.parties[1]);

                projectionOk(3, 1, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when 5 points are scored', function () {
                score(3).for(clash.parties[0]);
                score(2).for(clash.parties[1]);

                projectionOk(3, 2, parties[1].individuals[0], parties[0].individuals[0]);
            });

            it('projects correctly when 10 points are scored', function () {
                score(6).for(clash.parties[0]);
                score(4).for(clash.parties[1]);

                projectionOk(6, 4, parties[0].individuals[0], parties[1].individuals[0]);
            });

            it('projects correctly when playing on tie-break', function () {
                score(10).for(clash.parties[0]);
                score(10).for(clash.parties[1]);
                projectionOk(10, 10, parties[0].individuals[0], parties[1].individuals[0]);
                score().for(clash.parties[0]);
                projectionOk(11, 10, parties[1].individuals[0], parties[0].individuals[0]);
                score().for(clash.parties[1]);
                projectionOk(11, 11, parties[0].individuals[0], parties[1].individuals[0]);
                score().for(clash.parties[1]);
                projectionOk(11, 12, parties[1].individuals[0], parties[0].individuals[0]);
                score().for(clash.parties[1]);
                projectionOk(11, 13, parties[0].individuals[0], parties[1].individuals[0]);
            });

        });

    });

}).call(this, this.angular, this.H.ScoreKeeper, this._);