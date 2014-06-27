(function (angular, k) {
    'use strict';

    var inject = angular.injector(['ScoreKeeper.Tennis']),
        GameDetails = inject.get('GameDetails'),
		MatchDetails = inject.get('FrayDetails'),
        Projector = inject.get('Projector'),
        parties = null,
        clash = null,
        details = null,
		p = null;

    describe('Tennis scoring', function () {
        it('uses inject-ables', function () {
            expect(MatchDetails).toBeDefined();
            expect(GameDetails).toBeDefined();
            expect(Projector).toBeDefined();
        });

        describe('Game scoring', function () {
            beforeEach(function () {
                parties = [
				    new k.Party('Fed').addMembers([new k.Individual('Roger', 'Federer')]),
				    new k.Party('Rafa').addMembers([new k.Individual('Rafael', 'Nadal')])
                ];
                details = new GameDetails();
                details.serving = parties[0].individuals[0];
                details.receiving = parties[1].individuals[0];
                clash = new k.Clash(parties, details);
                p = new Projector.Game(clash);
            });

            it('begins at love all', function () {
                var proj = p.now();
                expect(proj.scorePerPartyName.Fed).toEqual('0');
                expect(proj.scorePerPartyName.Rafa).toEqual('0');
            });

            it('is not won at first', function () {
                var proj = p.now();
                expect(proj.isWon).toBe(false);
                expect(proj.winner).toBe(null);
            });

        });

    });

}).call(this, this.angular, this.H.ScoreKeeper);