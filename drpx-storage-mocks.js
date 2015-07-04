/*
	storageFactory(name: string): Storage#mock
		._values[key]: value # stored values
		._storage: Storage   # the returned storage object by storageFactory

	Storage:#mock
		.getItem(key: string): *promiseforvalue
		.clear(): *promiseforcompletion
		.keys(): *promiseforanarrayofkeys
		.removeKey(key: string): *promiseforcompletion
		.setItem(key: string, value: object): *promiseforcompletionwithvalue

	
*/
;(function(angular) {
	'use strict';

	angular
		.module('drpxStorageMocks', [])
		.factory('storageFactory', storageFactoryFactory)
		;

	storageFactoryFactory.$inject = ['$q','$window'];
	function storageFactoryFactory  ( $q , $window ) {

		storageFactory._values = {};
		storageFactory._storage = {
			clear: clear,
			getItem: getItem,
			keys: keys,
			removeItem: removeItem,
			setItem: setItem,
		};

		return storageFactory;

		function storageFactory() {
			return storageFactory._storage;
		}

		function clear() {
			angular.copy({}, storageFactory._values);
			return $q.when();
		}
		function getItem(key) {
			var value;
			if (key in storageFactory._values) {
				value = storageFactory._values[key];
			} else {
				value = null;
			}
			return $q.when(value);
		}
		function keys() {
			var keys = Object.keys(storageFactory._values);
			return $q.when(keys);
		}
		function removeItem(key) {
			delete storageFactory._values[key];
			return $q.when();
		}
		function setItem(key, value) {
			storageFactory._values[key] = value;
			return $q.when(value);
		}
	}

})(angular);