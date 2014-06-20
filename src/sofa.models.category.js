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
 * @method getOriginFullUrl
 * @memberof sofa.models.Category
 *
 * @description
 * Returns the URL used for the resource and uses the original shop URL
 * if `useShopUrls` in injected `config` is true. Otherwise will use the
 * `urlId` as a fallback.
 *
 * @return {string} the URL of the resource
 */
sofa.models.Category.prototype.getOriginFullUrl = function () {
    // TODO: reaching for sofa.Config here is super dirty.
    return this._config.useShopUrls ? this.originFullUrl : this.urlId;
};
