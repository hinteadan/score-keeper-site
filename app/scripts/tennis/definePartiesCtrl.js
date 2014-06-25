(function (angular, k, _) {
    'use strict';

    angular.module('ScoreKeeper.Tennis')
		.controller('defineParties', ['$scope', 'Fray', function ($s, fray) {
		    
			$s.parties = fray.parties;
			$s.add = {
				member: function (firstName, lastName) {
					return {
						to: function (party) {
							/// <param name="party" type="k.Party" />
							party.addMember(new k.Individual(firstName, lastName));
						}
					};
				}
			};
			$s.next = function () {
				
			};
			$s.isDefinitionValid = function () {
				return _.all(fray.parties, function (p) {
					return p.name && p.individuals.length > 0 && p.individuals.length === fray.parties[0].individuals.length;
				});
			};

		}]);

}).call(this, this.angular, this.H.ScoreKeeper, this._);