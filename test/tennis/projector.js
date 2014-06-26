(function (angular, k, _) {
    'use strict';

    var inject = angular.injector(['ScoreKeeper.Tennis']),
		fray = inject.get('Fray'),
        projector = inject.get('Projector');

    describe('Tennis scoring', function () {
        it('uses inject-ables', function () {
            expect(fray).toBeDefined();
            expect(projector).toBeDefined();
        })
    });

}).call(this, this.angular, this.H.ScoreKeeper, this._);