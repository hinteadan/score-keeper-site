(function (JSON, localStorage, undefined) {
    'use strict';

    function LocalStore(entityType, entityFactory) {

        var dataSet = [];

        function ensureEntityFactory() {
            if (typeof (entityFactory) === 'function') {
                return;
            }
            entityFactory = function (storeEntry) {
                return storeEntry;
            };
        }

        function initialize() {
            ensureEntityFactory();

            if (localStorage[entityType] === undefined) {
                return;
            }

            var storeEntries = JSON.parse(localStorage[entityType]);

            for (var key in storeEntries) {
                dataSet.push(entityFactory(storeEntries[key]));
            }
        }

        function saveToLocalStorage() {
            localStorage[entityType] = JSON.stringify(dataSet);
        }

        function addEntity(entity) {
            dataSet.push(entity);
            saveToLocalStorage();
        }

        function fetchAllEntities() {
            return dataSet;
        }

        initialize();

        //Public API
        this.add = function (entity) {

            addEntity(entity);

            return {
                then: function (callback) {
                    callback.call(undefined, entity);
                }
            };
        };

        this.query = function () {
            return {
                then: function (callback) {
                    callback.call(undefined, fetchAllEntities());
                }
            };
        };

        this.save = function () {
            saveToLocalStorage();
            return {
                then: function (callback) {
                    callback.call(undefined);
                }
            };
        };
    }

    this.storage = this.storage || {};
    this.storage.LocalStore = LocalStore;

}).call(this, this.JSON, this.localStorage);