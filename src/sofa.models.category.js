'use strict';
/**
 * @name Product
 * @namespace sofa.models.Category
 *
 * @description
 * A model that represents a Category object and adds convenient methods to it.
 */
sofa.define('sofa.models.Category', function (config) {
    this._config = config;
});

/**
 * @deprecated use getUrl()
 * @method getOriginFullUrl
 * @memberof sofa.models.Category
 *
 * @description
 * Returns the URL used for the resource
 *
 * @return {string} the URL of the resource
 */
sofa.models.Category.prototype.getOriginFullUrl = function () {
    return this.getUrl();
};

/**
 * @method getUrl
 * @memberof sofa.models.Category
 *
 * @description
 * Returns the category's URL.
 *
 * @return {string} The category URL
 */
sofa.models.Category.prototype.getUrl = function () {
    return this.route;
};

/**
 * @method hasChildren
 * @memberof sofa.models.Category
 *
 * @description
 * Returns whether the category has children or not.
 *
 * @return {boolean}
 */
sofa.models.Category.prototype.hasChildren = function () {
    return this.children && this.children.length;
};
