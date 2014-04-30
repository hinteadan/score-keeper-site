(function (angular, sk) {
    'use strict';

    angular.module('defineTournament')
    .controller('Participants', ['$scope', function ($scope) {

        var participants = [];

        function addIndividualNamed(firstName, lastName) {
            if (!lastName) {
                return;
            }
            participants.push(new sk.Individual(firstName, lastName));
        }

        function removeIndividual(person) {
            var index = participants.indexOf(person);
            if (index < 0) {
                return;
            }
            participants.splice(index, 1);
        }

        $scope.people = function () { return participants; };
        $scope.add = addIndividualNamed;
        $scope.remove = removeIndividual;
    }]);

}).call(this, this.angular, this.H.ScoreKeeper);