'use strict';
/**
 * @name BasketItem
 * @namespace sofa.models.BasketItem
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
 * @method getPrice
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the price of the basket item depending on the variant.
 *
 * @return {float} Price
 */
sofa.models.BasketItem.prototype.getPrice = function () {
    return this.variant && sofa.Util.isNumeric(this.variant.price) ? this.variant.price : this.product.price;
};

/**
 * @method getTotal
 * @memberof sofa.models.BasketItem
 *
 * @description
 * Returns the total price of the basket item considering the quantity.
 *
 * @return {float} Total price
 */
sofa.models.BasketItem.prototype.getTotal = function () {
    return sofa.Util.round(this.quantity * this.getPrice(), 2);
};

/**
 * @method getVariantID
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
 * @method getOptionID
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
