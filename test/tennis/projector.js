(function (angular, k) {
    'use strict';

    var inject = angular.injector(['ScoreKeeper.Tennis']),
        GameDetails = inject.get('GameDetails'),
		MatchDetails = inject.get('FrayDetails'),
        Projector = inject.get('Projector'),
        parties = null,
        clash = null,
        details = null,
		p = null,
        proj = null;

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

    function gameScoreProjectionOk(forFed, forRafa) {
        proj = p.now();
        expect(proj.scorePerPartyName.Fed).toEqual(forFed);
        expect(proj.scorePerPartyName.Rafa).toEqual(forRafa);
    }

    function gameWinProjectionOk(shouldBeWonBy) {
        proj = p.now();
        expect(proj.isWon).toBe(shouldBeWonBy ? true : false);
        expect(proj.winner).toBe(shouldBeWonBy ? shouldBeWonBy : null);
    }

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
                proj = null;
            });

            it('begins at love all', function () {
                gameScoreProjectionOk('0', '0');
            });

            it('is not won at first', function () {
                gameWinProjectionOk();
            });

            it('scores correctly when points are won', function () {
                score().for(parties[0]);
                gameScoreProjectionOk('15', '0');
                score().for(parties[1]);
                gameScoreProjectionOk('15', '15');
                score().for(parties[0]);
                gameScoreProjectionOk('30', '15');
                score().for(parties[1]);
                gameScoreProjectionOk('30', '30');
                score().for(parties[1]);
                gameScoreProjectionOk('30', '40');
                score().for(parties[0]);
                gameScoreProjectionOk('40', '40');
                score().for(parties[0]);
                gameScoreProjectionOk('Ad', '-');
                score().for(parties[1]);
                gameScoreProjectionOk('40', '40');
                score().for(parties[1]);
                gameScoreProjectionOk('-', 'Ad');
                score().for(parties[0]);
                gameScoreProjectionOk('40', '40');
                score(2).for(parties[0]);
                gameScoreProjectionOk('Wn', '-');
            });

            it('counts deuces', function () {
                expect(p.now().deuceCount).toBe(0);
                score(3).for(parties[0]);
                score(3).for(parties[1]);
                expect(p.now().deuceCount).toBe(1);
                score().for(parties[0]);
                score().for(parties[1]);
                expect(p.now().deuceCount).toBe(2);
                score().for(parties[0]);
                score().for(parties[1]);
                expect(p.now().deuceCount).toBe(3);
                score().for(parties[0]);
                score().for(parties[1]);
                expect(p.now().deuceCount).toBe(4);
                score(2).for(parties[0]);
                expect(p.now().deuceCount).toBe(4);
            });

            it('is won on 4th point if not tied', function () {
                score().for(parties[1]);
                score(4).for(parties[0]);
                gameWinProjectionOk(parties[0]);
            });

        });

    });

}).call(this, this.angular, this.H.ScoreKeeper);