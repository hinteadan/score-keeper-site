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

	function isObjectOrArray(obj) {
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

		function purgeFromLocalStorage() {
			delete localStorage[entityType];
		}

		function saveToLocalStorage() {
			if (!dataSet.length) {
				purgeFromLocalStorage();
				return;
			}

			localStorage[entityType] = JSON.stringify(dataSet);
		}

		function indexOf(entity) {
		    for (var i = 0; i < dataSet.length; i++) {
		        if (dataSet[i] === entity) {
		            return i;
		        }
		    }
		    return false;
		}

		function exists(entity) {
		    return indexOf(entity) !== false;
		}

		function addEntity(entity) {
		    if (exists(entity)) {
		        return;
		    }
			dataSet.push(entity);
			saveToLocalStorage();
		}

		function removeEntity(entity) {
		    var index = indexOf(entity);
		    if (!index) {
		        return;
		    }
		    dataSet.splice(index, 1);
		    saveToLocalStorage();
		}

		function replace(thisEntity, withThisEntity)
		{
		    var index = indexOf(thisEntity);
		    if (!index) {
		        return;
		    }
		    dataSet[index] = withThisEntity;
		    saveToLocalStorage();
		}

		function fetchAllEntities() {
			return dataSet;
		}

		initialize();

		//Public API
		this.add = function (entity) {
			addEntity(entity);
			return this;
		};

		this.zap = function (entity) {
			removeEntity(entity);
			return this;
		};

		this.replace = function (thisEntity) {
		    return {
		        with: function (thatEntity) {
		            replace(thisEntity, thatEntity);
		            return this;
		        }
		    };
		};

		this.query = function () {
			return fetchAllEntities();
		};

		this.any = function () {
			return fetchAllEntities().length > 0;
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