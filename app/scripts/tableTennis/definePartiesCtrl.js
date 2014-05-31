(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('defineParties', ['$scope', '$location', 'Clash', function ($scope, $location, clash) {
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
				$location.path('/clash');
			};

		}]);

}).call(this, this.angular, this.H.ScoreKeeper);