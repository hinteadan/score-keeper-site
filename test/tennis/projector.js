(function (angular, k, _) {
    'use strict';

    var inject = angular.injector(['ScoreKeeper.Tennis']),
		fray = inject.get('Fray');

    describe('Tennis scoring', function () {
        it('uses inject-ables', function () {
            expect(fray).toBeDefined();
        })
    });

}).call(this, this.angular, this.H.ScoreKeeper, this._);