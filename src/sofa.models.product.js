'use strict';
/**
 * @sofadoc model
 * @name sofa.models.Product
 * @package sofa-core
 * @distFile dist/sofa.core.js
 * @namespace sofa.models
 *
 * @description
 * A model that represents a Product object and adds convenient methods to it.
 */
sofa.define('sofa.models.Product', function (config) {
    this._config = config;
});

/**
 * @deprecated use getUrl()
 * @method getOriginFullUrl
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the URL used for the resource and uses the original shop URL
 * if `useShopUrls` in injected `config` is true. Otherwise will use the
 * `urlKey` as a fallback.
 *
 * @return {string} the URL of the resource
 */
sofa.models.Product.prototype.getOriginFullUrl = function () {
    return this.getUrl();
};

/**
 * @method getUrl
 * @memberof sofa.models.Product
 *
 * @description
 * Gets the product URL. If a product has more than one URL,
 * the suitable one can be received by passing in the category's URL as a parameter.
 *
 * @param {string} categoryUrl optional category URL to distinguish the
 * correct product URL from the routes object.
 *
 * @returns {string} The product's URL
 */
sofa.models.Product.prototype.getUrl = function (categoryUrl) {
    var routeObj = this.routes[0];

    if (categoryUrl) {
        routeObj = sofa.Util.find(this.routes, function (route) {
            return route.categoryUrl === categoryUrl;
        });
    }

    return routeObj.productUrl;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getImage
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the url to the product image by a given size. If no image exists in that
 * size, it returns a placeholder image url.
 *
 * @param {string} size Image size identifier.
 *
 * @return {string} Image url.
 */
// TODO: this one seems to be deprecated since sizes are handled by the imageResizer now.
sofa.models.Product.prototype.getImage = function (size) {
    for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].sizeName && this.images[i].sizeName.toLowerCase() === size) {
            return this.images[i].url;
        }
        else {
            return this.images[i].url;
        }
    }

    return this._config.mediaPlaceholder;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getMainImage
 * @memberof sofa.models.Product
 *
 * @description
 * Returns either the main image or the first image (as a fallback).
 *
 * @return {string} Image url.
 */

sofa.models.Product.prototype.getMainImage = function () {
    var mainImage;

    for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].main) {
            mainImage = this.images[i].url;
            break;
        }
    }

    return mainImage || this.getImage();
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getAllImages
 * @memberof sofa.models.Product
 *
 * @description
 * Returns all images of the product.
 *
 * @return {array} Array of image urls.
 */
sofa.models.Product.prototype.getAllImages = function () {
    return this.images;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasMultipleImages
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if a product supports multiple images.
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.hasMultipleImages = function () {
    return this.getAllImages().length > 0;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasBasePrice
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if a product has a base price.
 *
 * @return {boolean}
 */
// TODO: this method seems to be deprecated. There's no property "custom1" on products anymore
sofa.models.Product.prototype.hasBasePrice = function () {
    return this.custom1 > 0;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getBasePrice
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the base price per unit. When variant is passed, return the base price for this variant.
 *
 * @param {variant} Optional variant object
 *
 * @return {Number}
 */
// TODO: this method seems to be deprecated. There's no property "custom1" on products anymore
sofa.models.Product.prototype.getBasePriceStr = function (variant) {
    var base = this.custom1;
    if (variant && variant.unitAmount) {
        base = (1 / variant.unitAmount) * parseFloat(variant.price);
    }
    return sofa.Util.toFixed(base, 2);
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasUnit
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if a product has unit defined
 *
 * @return {boolean}
 */
// TODO: this method seems to be deprecated. There's no property "custom3" on products anymore
sofa.models.Product.prototype.hasUnit = function () {
    return sofa.Util.isString(this.custom3) && this.custom3.length > 0;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getUnit
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the unit of the product
 *
 * @return {String}
 */
// TODO: this method seems to be deprecated. There's no property "custom3" on products anymore
sofa.models.Product.prototype.getUnit = function () {
    return this.custom3;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasOldPrice
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if the product has an old price.
 *
 * @return {boolean}
 */
// TODO: this method seems to be deprecated. Price properties have changed. Refactor to hasSpecialPrice()
sofa.models.Product.prototype.hasOldPrice = function () {
    return sofa.Util.isNumeric(this.priceOld) && this.priceOld > 0;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasVariants
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if the product supports variants.
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.hasVariants = function () {
    return !!(this.variants && this.variants.length > 0);
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasInfiniteStock
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if the product has infinte stock
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.hasInfiniteStock = function () {
    return this.qty === undefined || this.qty === null;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#isOutOfStock
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if the product is currently out of stock.
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.isOutOfStock = function () {

    //this means, it's always in stock
    if (this.hasInfiniteStock()) {
        return false;
    }

    // a product is considered out of stock if:

    // -it has no variants and the qty is less or equal zero
    // -it has variants and all of them have a stock of less or equal zero

    return (!this.hasVariants() && this.qty <= 0) || this.areAllVariantsOutOfStock();
};

/**
 * @sofadoc method
 * @name sofa.models.Product#areAllVariantsOutOfStock
 * @memberof sofa.models.Product
 *
 * @description
 * Requests if all variants of the product are out of stock.
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.areAllVariantsOutOfStock = function () {
    if (this.hasVariants()) {
        return sofa.Util.every(this.variants, function (variant) {
            return variant.stock <= 0;
        });
    }

    return false;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#hasAttributes
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if the product has at least one attribute key
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.hasAttributes = function () {
    return this.attributes && Object.keys(this.attributes).length > 0;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getPrice
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the default product price
 *
 * @return {Number}
 */
sofa.models.Product.prototype.getPrice = function () {
    return this.price.normal;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getSpecialPrice
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the special product price
 *
 * @return {Number}
 */
sofa.models.Product.prototype.getSpecialPrice = function () {
    return this.price.special;
};

/**
 * @sofadoc method
 * @name sofa.models.Product#getVat
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the product vat
 *
 * @return {Number}
 */
sofa.models.Product.prototype.getVat = function () {
    return this.taxPercent;
};
