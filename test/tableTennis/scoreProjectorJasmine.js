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

        describe('For doubles', function () {

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

        });

    });

}).call(this, this.angular, this.H.ScoreKeeper, this._);