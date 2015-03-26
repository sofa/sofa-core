'use strict';
/**
 * @sofadoc model
 * @name sofa.models.BasketItem
 * @package sofa-core
 * @distFile dist/sofa.core.js
 * @namespace sofa.models
 *
 * @description
 * A basket item model that represents basket items. This model provides some methods
 * to access information about the basket item such as the price or the variant id.
 */
sofa.define('sofa.models.BasketItem', function () {

    var self = this;

    self.quantity = 0;

    return self;
});

/**
 * @sofadoc method
 * @name sofa.models.BasketItem#hasSpecialPrice
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns whether the item has a special price or not.
 *
 * @return {boolean}
 */
sofa.models.BasketItem.prototype.hasSpecialPrice = function () {
    var normalPrice = this.variant && this.variant.price.normal || this.product.price.normal;
    var specialPrice = this.variant && this.variant.price.special || this.product.price.special;

    return specialPrice < normalPrice;
};

/**
 * @sofadoc method
 * @name sofa.models.BasketItem#getPrice
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the price of the basket item depending on the variant.
 *
 * @return {float} Price
 */
sofa.models.BasketItem.prototype.getPrice = function () {
    return this.variant && sofa.Util.isNumeric(this.variant.price.normal) ? this.variant.price.normal : this.product.price.normal;
};

/**
 * @sofadoc method
 * @name sofa.models.BasketItem#getSpecialPrice
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the special price of the basket item depending on the variant.
 *
 * @return {float} Special Price
 */
sofa.models.BasketItem.prototype.getSpecialPrice = function () {
    return this.variant && sofa.Util.isNumeric(this.variant.price.special) ? this.variant.price.special : this.product.price.special;
};

/**
 * @sofadoc method
 * @name sofa.models.BasketItem#getTotal
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the total price of the basket item considering the quantity.
 *
 * @return {float} Total price
 */
// TODO: actually, the getSpecialPrice method could be used solely since the API always sets specialPrice (at least to equal normalPrice)
sofa.models.BasketItem.prototype.getTotal = function () {
    var getPriceFn = (this.hasSpecialPrice() ? this.getSpecialPrice : this.getPrice).bind(this);

    return sofa.Util.round(this.quantity * getPriceFn(), 2);
};

/**
 * @sofadoc method
 * @name sofa.models.BasketItem#getVariantID
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the variant id of the basket item if it exists.
 *
 * @return {int} Variant id.
 */
sofa.models.BasketItem.prototype.getVariantID = function () {
    return this.variant ? this.variant.variantID : null;
};

/**
 * @sofadoc method
 * @name sofa.models.BasketItem#getOptionID
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the option id of the basket item if it exists.
 *
 * @return {int} Option id.
 */
sofa.models.BasketItem.prototype.getOptionID = function () {
    return this.variant ? this.variant.optionID : null;
};
