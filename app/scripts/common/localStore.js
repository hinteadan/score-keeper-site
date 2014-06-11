(function (JSON, localStorage, undefined) {
    'use strict';

    var regexIsoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

    function fixDateOrGiveBack(value) {

        if (typeof value === 'string') {
            var isIsoDate = regexIsoDate.test(value);
            if (isIsoDate) {
                return new Date(value);
            }
        }

        return value;
    }

    function isObjectOrArray(obj){
        return typeof obj === 'object';
    }

    function fixDates(obj) {
        if (!isObjectOrArray(obj)) {
            return obj;
        }

        for (var property in obj) {
            if (isObjectOrArray(obj[property])) {
                fixDates(obj[property]);
            }
            obj[property] = fixDateOrGiveBack(obj[property]);
        }

        return obj;
    }

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

            var storeEntries = fixDates(JSON.parse(localStorage[entityType]));

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

        function purgeFromLocalStorage() {
            delete localStorage[entityType];
        }

        initialize();

        //Public API
        this.add = function (entity) {
            addEntity(entity);
            return this;
        };

        this.query = function () {
            return fetchAllEntities();
        };

        this.save = function () {
            saveToLocalStorage();
            return this;
        };

        this.purge = function () {
            purgeFromLocalStorage();
            dataSet = [];
            return this;
        };
    }

    this.storage = this.storage || {};
    this.storage.LocalStore = LocalStore;

}).call(this, this.JSON, this.localStorage);