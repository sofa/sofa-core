angular.module('sdk.directives.ccGoUpControl', [
    'src/directives/ccGoUpControl/cc-go-up-control.tpl.html',
    'sdk.directives.ccGoUpButton'
]);

angular.module('sdk.directives.ccGoUpControl')
    .directive('ccGoUpControl', [function() {

        'use strict';

        return {
            restrict: 'EA',
            templateUrl: 'src/directives/ccGoUpControl/cc-go-up-control.tpl.html',
            scope: {
                category: '=',
                homeText: '@'
            },
            replace: true,
            transclude: true,
            link: function($scope, element, attributes){

                $scope.getParentLabel = function () {
                    return $scope.category.parent && !$scope.category.parent.isRoot ? $scope.category.parent.label :
                           $scope.category.parent && $scope.category.parent.isRoot ? $scope.homeText : '';
                };
            }
        };
    }]);