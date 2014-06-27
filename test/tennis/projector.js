(function (angular, k) {
    'use strict';

    var inject = angular.injector(['ScoreKeeper.Tennis']),
		MatchDetails = inject.get('FrayDetails'),
        Projector = inject.get('Projector'),
        parties = null,
        clash = null,
		p = null;

    describe('Tennis scoring', function () {
        it('uses inject-ables', function () {
            expect(MatchDetails).toBeDefined();
            expect(Projector).toBeDefined();
        });

        describe('Game scoring', function () {
            beforeEach(function () {
                parties = [
				    new k.Party('Fed').addMembers([new k.Individual('Roger', 'Federer')]),
				    new k.Party('Rafa').addMembers([new k.Individual('Rafael', 'Nadal')])
                ];
                clash = new k.Clash(parties);
                p = new Projector.Game(clash);
            });

            it('begins at love all', function () {
                var proj = p.now();
                expect(proj.scorePerPartyName.Fed).toEqual('0');
                expect(proj.scorePerPartyName.Rafa).toEqual('0');
            });

        });

    });

}).call(this, this.angular, this.H.ScoreKeeper);