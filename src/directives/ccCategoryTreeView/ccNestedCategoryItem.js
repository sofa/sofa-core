angular.module('sdk.directives.ccCategoryTreeView')
    .directive('ccNestedCategoryItem', ['$compile', 'categoryTreeViewRemote', 'navigationService', 'snapRemote', function($compile, categoryTreeViewRemote, navigationService) {

        'use strict';

        return {
            restrict: 'A',
            require: '^ccTemplateCode',
            link: function($scope, $element, attributes, controller){
                $scope.isRoot = false;
                if ($scope.item.children){
                    $scope.items = $scope.item.children;
                    var html = $compile(controller.templateCode)($scope);
                    $element.append(html);
                }
                $scope.remoteControl = categoryTreeViewRemote;

                $scope.doAction = function(item){
                    if (!item.hasChildren){
                        categoryTreeViewRemote.setActive(item);
                        navigationService.navigateToProducts(item.urlId);
                    }
                    else{
                        categoryTreeViewRemote.toggleVisibility(item);
                    }
                };
            }
        };
    }]);