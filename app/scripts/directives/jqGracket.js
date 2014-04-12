(function(angular, $, undefined){
	'use strict';

	angular.module('scoreKeeperSiteApp')
	.directive('jqGracket', [function () {
		return {
            restrict: 'AC',
            transclude: false,
            scope: {
                options: '='
            },
            link: function (scope, element) {
                scope.$watch('options', function (options) {
                    element.gracket(options);
                });
            }
        };
	}]);

}).call(this, this.angular, this.jQuery);
