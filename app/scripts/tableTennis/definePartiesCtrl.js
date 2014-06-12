(function (angular, k, _) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('defineParties', ['$scope', '$location', 'Clash', 'ClashLocalStore', function ($scope, $location, clash, clashStore) {
			/// <param name='clashStore' type='storage.LocalStore' />

			$scope.parties = clash.parties;
			$scope.add = {
				member: function (firstName, lastName) {
					return {
						to: function (party) {
							/// <param name="party" type="k.Party" />
							party.addMember(new k.Individual(firstName, lastName));
						}
					};
				}
			};
			$scope.next = function () {
				clashStore.add(clash);
				$location.path('/clash');
			};
			$scope.isDefinitionValid = function () {
			    return _.all(clash.parties, function (p) {
                    return p.name && p.individuals.length > 0 && p.individuals.length === clash.parties[0].individuals.length;
			    });
			};

		}]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);