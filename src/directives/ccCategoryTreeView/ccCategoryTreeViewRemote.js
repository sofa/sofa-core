angular.module('sdk.directives.ccCategoryTreeView')
    .factory('categoryTreeViewRemote', [function() {

        'use strict';

        var self = {};

        var activeItem = null;

        self.setActive = function(item){
            asurePrivateStore(item);

            if (activeItem){
                activeItem._categoryTreeView.isActive = false;
            }

            item._categoryTreeView.isActive = true;
            self.setVisibility(item, true, true);

            activeItem = item;
        };

        self.setVisibility = function(item, visbility, upwardsRecursive){
            asurePrivateStore(item);
            item._categoryTreeView.isVisible = visbility;
            if (item.parent && upwardsRecursive){
                self.setVisibility(item.parent, visbility, upwardsRecursive);
            }
        };

        self.toggleVisibility = function(item){
            asurePrivateStore(item);
            item._categoryTreeView.isVisible = !item._categoryTreeView.isVisible;
        };

        self.setItemLevel = function(item, level){
            asurePrivateStore(item);
            item._categoryTreeView.level = level;
        };

        var asurePrivateStore = function(item){
            if (!item._categoryTreeView){
                item._categoryTreeView = { isVisible: false };
            }
        };

        return self;
    }]);