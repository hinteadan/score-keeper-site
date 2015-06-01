(function (angular, k, _) {
    'use strict';

    var inject = angular.injector(['ng', 'appConfig', 'ngRoute', 'ScoreKeeper.Tennis', 'ngMock']),
        GameDetails = inject.get('GameDetails'),
		SetDetails = inject.get('SetDetails'),
		gameTieMode = inject.get('GameTieModes'),
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

    function setOf(nGames) {
    	clash = new k.ClashSet(_.map(_.range(0, nGames), function () {
    		return new k.Clash(parties);
    	}), parties, details);
    	p = new Projector.Set(clash);
    }

    function setScoreProjectionOk(forFed, forRafa) {
    	proj = p.now();
    	expect(proj.scorePerPartyName.Fed).toEqual(forFed);
    	expect(proj.scorePerPartyName.Rafa).toEqual(forRafa);
    }

    function setWinProjectionOk(shouldBeWonBy) {
    	proj = p.now();
    	expect(proj.isWon).toBe(shouldBeWonBy ? true : false);
    	expect(proj.winner).toBe(shouldBeWonBy ? shouldBeWonBy : null);
    }

    describe('Tennis scoring', function () {
        it('uses inject-ables', function () {
            expect(MatchDetails).toBeDefined();
            expect(GameDetails).toBeDefined();
            expect(SetDetails).toBeDefined();
            expect(gameTieMode).toBeDefined();
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

            it('is not won when less than 4 points are scored', function () {
            	score(2).for(parties[1]);
            	score(2).for(parties[0]);
            	gameWinProjectionOk();
            });

            it('is won on 4th point if not tied', function () {
                score().for(parties[1]);
                score(4).for(parties[0]);
                gameWinProjectionOk(parties[0]);
            });

            it('is not won on tie', function () {
            	score(4).for(parties[1]);
            	score(4).for(parties[0]);
            	gameWinProjectionOk();
            });

            it('is won on tie after 2 point advantage', function () {
            	score(3).for(parties[1]);
            	score(3).for(parties[0]);
            	score().for(parties[1]);
            	score().for(parties[0]);
            	score().for(parties[1]);
            	score().for(parties[1]);
            	gameWinProjectionOk(parties[1]);
            });

            it('is won on tie point if mode is no-advantage win', function () {
            	clash.details.tieMode = gameTieMode.noAdvantageWin;
            	score(3).for(parties[1]);
            	score(3).for(parties[0]);
            	score().for(parties[0]);
            	gameWinProjectionOk(parties[0]);
            });

        });

        describe('Set scoring', function () {
        	beforeEach(function () {
        		parties = [
				    new k.Party('Fed').addMembers([new k.Individual('Roger', 'Federer')]),
				    new k.Party('Rafa').addMembers([new k.Individual('Rafael', 'Nadal')])
        		];
        		details = new SetDetails();
        		details.firstToServe = parties[0].individuals[0];
        		details.firstToReceive = parties[1].individuals[0];
        	});

        	it('starts at 0 - 0', function () {
        		setOf(6);
        		setScoreProjectionOk(0, 0);
        	});

        	it('scores correctly after winning some games', function () {
        		setOf(4);
        		clash.clashes[0].close(parties[0]);
        		clash.clashes[1].close(parties[0]);
        		clash.clashes[2].close(parties[0]);
        		clash.clashes[3].close(parties[1]);
        		setScoreProjectionOk(3, 1);
        	});

        	it('wins on straight <<games per set point>>', function () {
        		setOf(6);
        		_.each(clash.clashes, function (c) { c.close(parties[0]); });
        		setWinProjectionOk(parties[0]);
        		details.gamesCount = 3;
        		setOf(3);
        		_.each(clash.clashes, function (c) { c.close(parties[1]); });
        		setWinProjectionOk(parties[1]);
        	});
        });

    });

}).call(this, this.angular, this.H.ScoreKeeper, this._);