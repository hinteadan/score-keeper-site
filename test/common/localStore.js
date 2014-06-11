(function (LocalStore) {
    'use strict';

    var store = new LocalStore('UnitTests-6821EE21-0693-464B-9E75-204A7AD5CB7F');

    function fullyRefreshLocalStore() {
        store = new LocalStore('UnitTests-6821EE21-0693-464B-9E75-204A7AD5CB7F');
    }

    describe('Local Store', function () {

        beforeEach(function () {
            store = new LocalStore('UnitTests-6821EE21-0693-464B-9E75-204A7AD5CB7F');
        });

        afterEach(function () {
            store.purge();
        });

        it('starts off empty', function () {
            fullyRefreshLocalStore();
            expect(store.query()).toBeDefined();
            expect(store.query().length).toBe(0);
        });

        it('stores basic types', function () {
            store.add(null);
            store.add(42);
            store.add(true);
            store.add(false);
            store.add('some string');
            fullyRefreshLocalStore();
            expect(store.query()[0]).toBe(null);
            expect(store.query()[1]).toBe(42);
            expect(store.query()[2]).toBe(true);
            expect(store.query()[3]).toBe(false);
            expect(store.query()[4]).toBe('some string');
        });

        it('stores dates', function () {
            var date = new Date();
            store.add(date);
            fullyRefreshLocalStore();
            expect(store.query()[0]).toEqual(date);
        });

        it('stores complex entities', function () {
            var entity = {
                id: 'entity-1',
                name: 'Some awesome entity',
                metadata: {
                    param1: 'awesome',
                    param2: 0,
                    param3: false,
                    param4: true,
                    param5: new Date()
                },
                details: {
                    person: {
                        firstName: 'Dan',
                        lastName: 'Hintea'
                    },
                    timestamp: new Date(),
                    roles: ['role1', 'role2', 'role3']
                }
            };
            store.add(entity);
            fullyRefreshLocalStore();
            expect(store.query()[0]).toEqual(entity);
        });

    });

}).call(this, this.storage.LocalStore);