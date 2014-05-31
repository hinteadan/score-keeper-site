(function (angular, k) {
	'use strict';

	angular.module('ScoreKeeper.TableTennis')
		.controller('defineParties', ['$scope', 'Clash', function ($scope, clash) {
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

		}]);

}).call(this, this.angular, this.H.ScoreKeeper);