'use strict';
/**
 * @name TreeIterator
 * @namespace sofa.helper.TreeIterator
 *
 * @description
 * We only use the TreeIterator to built a HashMap for fast lookups.
 * So it doesn't really care if we use a depth first or a breadth first approach.
 */
sofa.define('sofa.util.TreeIterator', function (tree, childNodeProperty) {

    var me = this,
        continueIteration = true;

    /**
     * @method iterateChildren
     * @memberof sofa.helper.TreeIterator
     *
     * @description
     * Iterates over a tree of children and applies a given function to
     * each node.
     *
     * @param {function} fn Map function
     */
    me.iterateChildren = function (fn) {
        continueIteration = true;
        return _iterateChildren(tree, fn);
    };

    var _iterateChildren = function (rootCategory, fn, parent) {
        continueIteration = fn(rootCategory, parent);

        if (rootCategory[childNodeProperty] && continueIteration !== false) {
            rootCategory[childNodeProperty].forEach(function (category) {
                if (continueIteration !== false) {
                    _iterateChildren(category, fn, rootCategory);
                }
            });
        }
    };
});
