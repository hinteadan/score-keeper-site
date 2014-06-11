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

        it('stores basic types', function () {
            store.add(null);
            store.add(42);
            store.add(true);
            store.add(false);
            store.add('some string');
            expect(store.query()[0]).toBe(null);
            expect(store.query()[1]).toBe(42);
            expect(store.query()[2]).toBe(true);
            expect(store.query()[3]).toBe(false);
            expect(store.query()[4]).toBe('some string');
        });

    });

}).call(this, this.storage.LocalStore);