(function (LocalStore) {
    'use strict';

    var store = new LocalStore('UnitTests-6821EE21-0693-464B-9E75-204A7AD5CB7F');

    describe('Local Store', function () {

        afterEach(function () {
            store.purge();
        });

        it('starts off empty', function () {
            expect(store.query()).toBeDefined();
            expect(store.query().length).toBe(0);
        });

    });

}).call(this, this.storage.LocalStore);