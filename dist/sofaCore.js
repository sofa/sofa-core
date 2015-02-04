/**
 * sofa-core - v0.13.2 - Wed Feb 04 2015 16:32:51 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, document, undefined) {
'use strict';
/**
 * @sofadoc class
 * @name sofa
 * @package sofa-core
 * @distFile dist/sofa.core.js
 *
 * @description
 * The `sofa` object provides a global namespace for methods to build the internal
 * library structure of sofa itself. These are methods for things such as defining
 * sub namespaces on the `sofa` object or providing inheritance functionality for
 * JavaScript objects. It's worth to mention that the `sofa` object is a very
 * low-level interface for developers. You actually don't have to access all of
 * its methods since they are mainly for internal functionality.
 *
 * However, when developing new sofa components, that sit on top of sofa's core,
 * you have to use `sofa.define()` to create a sub namespace and its component
 * functionality.
 */
var cc = window.cc = {};
var sofa = window.sofa = cc;

/**
 * @sofadoc method
 * @name sofa#namespace
 * @memberof sofa
 *
 * @description
 * Creates the given namespace within the `sofa` namespace. The method returns
 * a `namespaceObject` that contains information about the namespace. Simply pass
 * a string that represents a namespace using the dot notation. So a valid namespace
 * would be `foo.bar.bazinga` as well as `foo`.
 *
 * It's not required to mention `sofa` as root in the namespace, since this
 * method creates the given namespace automatically under `sofa` namespace. In case
 * 'sofa' is given as root namespace, it gets stripped out, so its more a kind of
 * syntactic sugar to mention `sofa` namespace.
 *
 * The following code creates a namespace for `sofa.services.FooService`:
 *
 * ```js
 * sofa.namespace('sofa.services.FooService');
 * ```
 *
 * And like mentioned, this would also create exactly the same namespace:
 *
 * ```js
 * sofa.namespace('services.FooService');
 * ```
 *
 * @param {string} namespaceString A string that represents the new created namespace
 * e.g. `sofa.services.FooService`.
 * @returns {object} A namespace object containing information about the current
 * and parent targets with the following structure:
 *
 *     targetParent - Parent namespace object.
 *     targetName - Current namespace name.
 *     bind - A convenient function to bind a value to the namespace.
 */
sofa.namespace = function (namespaceString) {
    var parts = namespaceString.split('.'), parent = sofa, i;

    //strip redundant leading global
    if (parts[0] === 'cc' || parts[0] === 'sofa') {
        parts = parts.slice(1);
    }

    var targetParent = sofa,
        targetName;

    for (i = 0; i < parts.length; i++) {
        //create a propery if it doesn't exist
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }

        if (i === parts.length - 2) {
            targetParent = parent[parts[i]];
        }

        targetName = parts[i];

        parent = parent[parts[i]];
    }

    return {
        targetParent: targetParent,
        targetName: targetName,
        bind: function (target) {
            targetParent[targetName] = target;
        }
    };
};

/**
 * @sofadoc method
 * @name sofa#define
 * @memberof sofa
 *
 * @description
 * The `define` method delegates to sofa.namespace and binds a new value to its
 * given namespace. Because of delegation, rules for the given namespace are the
 * same as for `sofa.namespace`. As second argument you have to provide a
 * constructor function that will be bound to the given namespace.
 *
 * You generally use this method to define new components in the `sofa` namespace.
 * For example, creating a new component `FooService` in the namespace `sofa.services`
 * could look like this:
 *
 * ```js
 * sofa.define('foo.bar', function () {
 *  // some logic
 * });
 * ```
 *
 * Since this is plain old JavaScript, it's also possible to use named functions
 * as constructor argument, to make the code a bit more readable:
 *
 * ```js
 * var Greeter = function () {
 *  return {
 *    sayHello: function () {
 *      console.log('hello');
 *    }
 *  };
 * };
 *
 * sofa.define('greeter', Greeter);
 * ```
 *
 * Once a component is defined, you can use it by instantiating it via `new`
 * operator like this:
 *
 * ```js
 * var greeterService = new sofa.greeter();
 * greeter.sayHello();
 * ```
 *
 * @param {string} namespace A string that represents the namespace of the to be
 * defined component, e.g. `sofa.services.FooService`.
 * @param {function} fn A constructor function that will be bound to the namespace.
 */
sofa.define = function (namespace, fn) {
    sofa.namespace(namespace).bind(fn);
};

'use strict';
/**
 * @sofadoc class
 * @name sofa.ConfigService
 * @package sofa-core
 * @distFile dist/sofa.core.js
 *
 * @description
 * This is a general configuration service which kind of behaves like a registry
 * pattern to make configurations available on all layers. Use this service to
 * access configuration data for you shop.
 */
sofa.define('sofa.ConfigService', function () {

    var self = {};

    sofa.Config = sofa.Config || {};

    /**
     * @sofadoc method
     * @name sofa.ConfigService#getSupportedCountries
     * @memberof sofa.ConfigService
     *
     * @description
     * Returns an array of supported countries for shipping and invoicing. If no
     * countries are specified on the internal config object, this method returns
     * and empty array. Simply call this method by running:
     *
     * ```js
     * var countries = configService.getSupportedCountries();
     * ```
     * @return {array}  An array of strings for supported countries for shipping and invoicing.
     */
    self.getSupportedCountries = function () {
        if (!sofa.Config.countries) {
            //should we rather throw an exception here?
            return [];
        }

        return sofa.Config.countries;
    };

    /**
     * @sofadoc method
     * @name sofa.ConfigService#getDefaultCountry
     * @memberof sofa.ConfigService
     *
     * @description
     * Returns the default country for shipping and invoicing that is configured
     * for the shop. In case no countries are available, this method returns `null`.
     * ```js
     * var defaultCountry = configService.getDefaultCountry();
     * ```
     *
     * @return {string} Name of the default country.
     */
    self.getDefaultCountry = function () {
        var countries = self.getSupportedCountries();
        return countries.length === 0 ? null : countries[0];
    };

    /**
     * @sofadoc method
     * @name sofa.ConfigService#getLocalizedPayPalButtonClass
     * @memberof sofa.ConfigService
     *
     * @description
     * Returns a localized paypal button css class. This method has to be refactored
     * since it currently relies on hard-coded class names. Passing an expression
     * that ends up in a boolean value, tells the method wether to return a class
     * for an enabled or a disabled button.
     *
     * For example calling this method like this:
     *
     * ```js
     * var className = configService.getLocalizedPayPalButtonClass();
     * ```
     * Returns the class for an enabled button. Calling it with for example `true`
     * gives us the class for a disabled button.
     *
     * ```js
     * var className = configService.getLocalizedPayPalButtonClass(true);
     * ```
     *
     * @return {string} PayPal button class name.
     */
    self.getLocalizedPayPalButtonClass = function (disabled) {
        return !disabled ? 'cc-paypal-button--' + self.get('locale') :
                           'cc-paypal-button--' + self.get('locale') + '--disabled';
    };

    /**
     * @sofadoc method
     * @name sofa.ConfigService#get
     * @memberof sofa.ConfigService
     *
     * @description
     * Generic getter function that returns a config value by a given key.
     *
     * ```js
     * var value = configService.get('foo');
     * ```
     *
     * If a default value is passed and no config setting with the given key
     * exists, it is returned. For example, assuming that no configuration for
     * `foo` exists, we can default to any custom value like this:
     *
     * ```js
     * var value = configService.get('foo', 5); // `5` is a default value
     * ```
     *
     * If no configuration exists and no default value is given, this method
     * returns `undefined`.
     *
     * @param {string} key Key for a certain config value.
     * @param {object} defaultValue A default value which will be returned
     * if given key doesn't exist in config.
     *
     * @return {object} Associative object for `key`.
     */
    self.get = function (key, defaultValue) {

        var value = sofa.Config[key];

        if (sofa.Util.isUndefined(value) && !sofa.Util.isUndefined(defaultValue)) {
            return defaultValue;
        }

        return value;
    };

    return self;
});

'use strict';
/**
 * @sofadoc class
 * @name sofa.LocationService
 * @package sofa-core
 * @distFile dist/sofa.core.js
 *
 * @description
 * Service to work with the browsers location.
 */
sofa.define('sofa.LocationService', function () {

    return {
        /**
         * @sofadoc method
         * @name sofa.LocationService#path
         * @memberof sofa.LocationService
         *
         * @description
         * Return the location href
         *
         * @return {string} href
         */
        path: function () {
            return window.location.href;
        }
    };
});

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
 * @name sofa.models.BasketItem#getPrice
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
 * @sofadoc method
 * @name sofa.models.BasketItem#getTotal
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
    return this._config.useShopUrls ? this.originFullUrl : this.urlKey;
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
 * Returns all images of the product in size 'large'.
 *
 * @return {array} Array of image urls.
 */
sofa.models.Product.prototype.getAllImages = function () {

    if (!this._allImages) {
        this._allImages = [{ url: this.getImage('large') }].concat(this.imagesAlt);
    }

    return this._allImages;
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

'use strict';
/**
 * @name Observable
 * @namespace sofa.Observable
 *
 * @description
 *
 */
sofa.define('sofa.Observable', function () {

    var self = {
        mixin: function (obj, handlers) {
            // we store the list of handlers as a local variable inside the scope
            // so that we don't have to add random properties to the object we are
            // converting. (prefixing variables in the object with an underscore or
            // two is an ugly solution)
            //      we declare the variable in the function definition to use two less
            //      characters (as opposed to using 'var ').  I consider this an inelegant
            //      solution since smokesignals.convert.length now returns 2 when it is
            //      really 1, but doing this doesn't otherwise change the functionallity of
            //      this module, so we'll go with it for now
            handlers = {};

            // add a listener
            obj.on = function (eventName, handler) {
                // either use the existing array or create a new one for this event
                //      this isn't the most efficient way to do this, but is the shorter
                //      than other more efficient ways, so we'll go with it for now.
                (handlers[eventName] = handlers[eventName] || [])
                    // add the handler to the array
                    .push(handler);

                return obj;
            };

            // add a listener that will only be called once
            obj.once = function (eventName, handler) {
                // create a wrapper listener, that will remove itself after it is called
                function wrappedHandler() {
                    // remove ourself, and then call the real handler with the args
                    // passed to this wrapper
                    handler.apply(obj.off(eventName, wrappedHandler), arguments);
                }
                // in order to allow that these wrapped handlers can be removed by
                // removing the original function, we save a reference to the original
                // function
                wrappedHandler.h = handler;

                // call the regular add listener function with our new wrapper
                return obj.on(eventName, wrappedHandler);
            };

            // remove a listener
            obj.off = function (eventName, handler) {
                // loop through all handlers for this eventName, assuming a handler
                // was passed in, to see if the handler passed in was any of them so
                // we can remove it
                //      it would be more efficient to stash the length and compare i
                //      to that, but that is longer so we'll go with this.
                for (var list = handlers[eventName], i = 0; handler && list && list[i]; i++) {
                    // either this item is the handler passed in, or this item is a
                    // wrapper for the handler passed in.  See the 'once' function
                    /*jshint expr: true */
                    list[i] !== handler && list[i].h !== handler || list.splice(i--, 1);
                    /*jshint expr: false */
                }
                // if i is 0 (i.e. falsy), then there are no items in the array for this
                // event name (or the array doesn't exist)
                if (!i) {
                    // remove the array for this eventname (if it doesn't exist then
                    // this isn't really hurting anything)
                    delete handlers[eventName];
                }
                return obj;
            };

            obj.emit = function (eventName) {
                // loop through all handlers for this event name and call them all
                //      it would be more efficient to stash the length and compare i
                //      to that, but that is longer so we'll go with this.
                for (var list = handlers[eventName], i = 0; list && list[i];) {
                    list[i++].apply(obj, list.slice.call(arguments, 1));
                }
                return obj;
            };

            return obj;
        }
    };

    return self;
});

sofa.observable = new sofa.Observable();

'use strict';
/* global document: true */
/* global keys: true */
/* global isEqual: true */

function isArrayLike(obj) {
    if (obj === null || isWindow(obj)) {
        return false;
    }

    var length = obj.length;

    if (obj.nodeType === 1 && length) {
        return true;
    }

    return sofa.Util.isString(obj) || sofa.Util.isArray(obj) || length === 0 ||
            typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
}
/**
 * @sofadoc class
 * @name sofa.Util
 * @package sofa-core
 * @distFile dist/sofa.core.js
 * @static
 *
 * @description
 * Namespace containing utility functions for compatibility stuff etc.
 *
 */
sofa.Util = {
    /**
     * @sofadoc method
     * @name sofa.Util#isToFixedBroken
     * @memberof sofa.Util
     *
     * @description
     * Checks if the <code>toFixed()</code> function in the current JavaScript
     * environment is broken or not. For more info see http://docs.sencha.com/touch/2.2.0/source/Number2.html#Ext-Number-method-toFixed.
     *
     * @return {boolean} Whether its broken or not.
     */
    isToFixedBroken: (0.9).toFixed() !== '1',
    indicatorObject: {},

    objectTypes: {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    },

    /**
     * @sofadoc method
     * @name sofa.Util#domReady
     * @memberof sofa.Util
     *
     * @description
     * Takes a function and executes it if the document is ready at this point.
     * If its not, it registers the given function as callback.
     *
     * @param {function} fn Callback function to execute once DOM is ready.
     */
    domReady: function (fn) {
        if (document.readyState === 'complete') {
            fn();
        }
        else {
            window.addEventListener('load', fn, false);
        }
    },
    /**
     * @sofadoc method
     * @name sofa.Util#round
     * @memberof sofa.Util
     *
     * @description
     * Rounds a given value by a number of given places and returns it.
     *
     * @param {(float|number)} value Value to be round.
     * @param {int} places Number of places to round the value.
     *
     * @return {float} Rounded value
     */
    round: function (value, places) {
        var multiplier = Math.pow(10, places);
        return (Math.round(value * multiplier) / multiplier);
    },
    /**
     * @sofadoc method
     * @name sofa.Util#oFixed
     * @memberof sofa.Util
     *
     * @description
     * Transformes a given value to a string with a fixed value by a given precision.
     *
     * @param {(number|float)} value Value to fix.
     * @param {number} precision Precision.
     *
     * @return {String} Transformed fixed value.
     */
    toFixed: function (value, precision) {

        value = sofa.Util.isString(value) ? parseFloat(value) : value;

        if (sofa.Util.isToFixedBroken) {
            precision = precision || 0;
            var pow = Math.pow(10, precision);
            return (Math.round(value * pow) / pow).toFixed(precision);
        }

        return value.toFixed(precision);
    },
    /**
     * @sofadoc method
     * @name sofa.Util#clone
     * @memberof sofa.Util
     *
     * @description
     * This method is useful for cloning complex (read: nested) objects without
     * having references from the clone to the original object.
     * (See http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object).
     *
     * @param {object} obj Object to clone.
     * @return {object} A clone of the given object.
     */
    clone: function (obj) {
        // Handle the 3 simple types, and null or undefined
        if (null === obj || 'object' !== typeof obj) {
            return obj;
        }

        var copy;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = this.clone(obj[attr]);
                }
            }
            return copy;
        }

        throw new Error('Unable to copy obj! Its type isn\'t supported.');
    },
    /**
     * @sofadoc method
     * @name sofa.Util#extend
     * @memberof sofa.Util
     *
     * @description
     * Extends the given object by members of additional given objects.
     *
     * @param {object} dst Destination object to extend.
     *
     * @return {object} Extended destination object.
     */
    extend: function (dst) {
        //strange thing, we can't use forOwn here because
        //phantomjs raises TypeErrors that don't happen in the browser
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj !== dst) {
                for (var key in obj) {
                    dst[key] = obj[key];
                }
            }
        }
        return dst;
    },
    /*jshint eqeqeq:true */
    //this method is ripped out from lo-dash
    /*jshint eqeqeq:false*/
    createCallback: function (func, thisArg, argCount) {
        var type = typeof func;
        if (type !== 'function') {
            if (type !== 'object') {
                return function (object) {
                    return object[func];
                };
            }
            var props = keys(func);
            return function (object) {
                var length = props.length,
                    result = false;
                while (length--) {
                    if (!(result = isEqual(object[props[length]], func[props[length]], sofa.Util.indicatorObject))) {
                        break;
                    }
                }
                return result;
            };
        }
        if (typeof thisArg == 'undefined') {
            return func;
        }
        if (argCount === 1) {
            return function (value) {
                return func.call(thisArg, value);
            };
        }
        if (argCount === 2) {
            return function (a, b) {
                return func.call(thisArg, a, b);
            };
        }
        if (argCount === 4) {
            return function (accumulator, value, index, collection) {
                return func.call(thisArg, accumulator, value, index, collection);
            };
        }
        return function (value, index, collection) {
            return func.call(thisArg, value, index, collection);
        };
    },
    /*jshint eqeqeq:true*/
    //this method is ripped out from lo-dash
    findKey: function (object, callback, thisArg) {
        var result;
        callback = sofa.Util.createCallback(callback, thisArg);
        sofa.Util.forOwn(object, function (value, key, object) {
            if (callback(value, key, object)) {
                result = key;
                return false;
            }
        });
        return result;
    },
    find: function (object, callback, thisArg) {
        var result;
        callback = sofa.Util.createCallback(callback, thisArg);
        sofa.Util.forOwn(object, function (value, key, object) {
            if (callback(value, key, object)) {
                result = value;
                return false;
            }
        });
        return result;
    },
    every: function (collection, callback, thisArg) {
        var result = true;

        callback = sofa.Util.createCallback(callback, thisArg);

        sofa.Util.forOwn(collection, function (value, key, object) {
            if (!callback(value, key, object)) {
                result = false;
                return false;
            }
        });

        return result;
    },
    //this method is ripped out from lo-dash
    forOwn: function (collection, callback) {
        var index,
            iterable = collection,
            result = iterable;

        if (!iterable) {
            return result;
        }

        if (!sofa.Util.objectTypes[typeof iterable]) {
            return result;
        }

        for (index in iterable) {
            if (Object.prototype.hasOwnProperty.call(iterable, index)) {
                if (callback(iterable[index], index, collection) === false) {
                    return result;
                }
            }
        }
        return result;
    },
    debounce: function (func, wait, immediate) {
        var timeout, result;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
            }
            return result;
        };
    },
    isObject: function (value) {
        return typeof value === 'object';
    },
    isNumber: function (value) {
        return typeof value === 'number';
    },
    isNumeric: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    isArray: function (value) {
        return value instanceof Array;
    },
    isFunction: function (value) {
        return typeof value === 'function';
    },
    isString: function (value) {
        return typeof  value === 'string';
    },
    isUndefined: function (value) {
        return typeof value === 'undefined';
    },
    isNotNullNorUndefined: function (value) {
        return !sofa.Util.isUndefined(value) && value !== null;
    },
    isEmptyObject: function (obj) {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    },
    isEmpty: function (enumerable) {
        return this.isArray(enumerable) ? !enumerable.length :
            this.isObject(enumerable) ? this.isEmptyObject(enumerable) : true;
    },
    createGuid: function () {
      //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            /*jshint bitwise: false */
            var r = Math.random() * 16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * @sofadoc class
     * @name sofa.Util.Array
     * @package sofa-core
     * @distFile dist/sofa.core.js
     *
     * @description
     * foo
     */
    Array: {
        /**
        * @sofadoc method
        * @name sofa.Util.Array#remove
        * @memberof sofa.Util
        *
        * @description
        * Removes a given item from a given array and returns the manipulated
        * array.
        *
        * @example
        * var arr = ['foo', 'bar'];
        *
        * var newArr = sofa.Util.Array.remove(arr, 'foo');
        *
        * @param {array} arr An array.
        * @param {object} item The item to remove from the array.
        *
        * @return {array} Manipulated array.
        */
        remove: function (arr, item) {
            var index = arr.indexOf(item);
            arr.splice(index, 1);
            return arr;
        }
    },

    // The backend is not returning valid JSON.
    // It sends it wrapped with parenthesis.
    //
    // This function will become obselete soon,
    // see https://github.com/couchcommerce/checkout-api/issues/2
    toJson: function (str) {

        if (!str || !str.length || str.length < 2) {
            return null;
        }

        var jsonStr = str.substring(1, str.length - 1);

        return JSON.parse(jsonStr);
    },

    toFormData: function (obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    },


    forEach: function (obj, iterator, context) {
        var key;
        if (obj) {
            if (sofa.Util.isFunction(obj)) {
                for (key in obj) {
                    // Need to check if hasOwnProperty exists,
                    // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            } else if (obj.forEach && obj.forEach !== sofa.Util.forEach) {
                obj.forEach(iterator, context);
            } else if (isArrayLike(obj)) {
                for (key = 0; key < obj.length; key++) {
                    iterator.call(context, obj[key], key);
                }
            } else {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key);
                    }
                }
            }
        }
        return obj;
    }
};

'use strict';
/**
 * @sofadoc class
 * @name sofa.Util.TreeIterator
 * @package sofa-core
 * @distFile dist/sofa-core.js
 * @namespace sofa.Util.TreeIterator
 *
 * @description
 * We only use the TreeIterator to built a HashMap for fast lookups.
 * So it doesn't really care if we use a depth first or a breadth first approach.
 */
sofa.define('sofa.util.TreeIterator', function (tree, childNodeProperty) {

    var me = this,
        continueIteration = true;

    /**
     * @sofadoc method
     * @name sofa.Util.TreeIterator#iterateChildren
     * @memberof sofa.Util.TreeIterator
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
}(sofa, document));
