;(function (window, undefined) {

'use strict';
/**
 * @module sofa
 *
 * @description
 * The web app SDK module contains all SDK components you need to build your
 * custom mobile shop based on CouchCommerce API's.
 */

/**
 * @name sofa
 * @class
 * @global
 * @static
 * @namespace sofa
 *
 * @description
 * The global `sofa` object is a static instance that provides a basic API to create
 * for example namespaces as well as methods for creating inheritance.
 * In general you'd never use this object directly, since the SDK takes care of
 * that for you.
 */
var cc = window.cc = {};
var sofa = window.sofa = cc;

/**
 * @method namespace
 * @memberof sofa
 * @public
 *
 * @description
 * Creates the given namespace within the 'sofa' namespace. The method returns
 * a `namespaceObject` that contains information about the namespace.
 *
 * Simply pass a string that represents a namespace using the dot notation.
 * So a valid namespace would be 'foo.bar.bazinga' as well as 'foo'.
 *
 * It's not required to mention 'sofa' as root in the namespace, since this
 * method creates the given namespace automatically under 'sofa' namespace.
 *
 * In case 'sofa' is given as root namespace, it gets stripped out, so its more
 * a kind of syntactic sugar to mention 'sofa' namespace.
 *
 * @example
 * // creates a namespace for `sofa.services.FooService`
 * sofa.namespace('sofa.services.FooService');
 *
 * @example
 * // also creates a namespace for `sofa.services.FooService`
 * sofa.namespace('services.FooService');
 *
 * @param {string} namespaceString A namespace string e.g. 'sofa.services.FooService'.
 * @returns {namespaceObject} A namespace object containing information about the current
 * and parent targets.
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

    /**
    * @typdef namespaceObject
    * @type {object}
    * @property {object} targetParent - Parent namespace object.
    * @property {string} targetName - Current namespace name.
    * @property {function} bind - A convenient function to bind a value to the namespace.
    */
    return {
        targetParent: targetParent,
        targetName: targetName,
        bind: function (target) {
            targetParent[targetName] = target;
        }
    };
};

/**
 * @method define
 * @memberof sofa
 * @public
 *
 * @description
 * This method delegates to [sofa.namespace]{@link sofa#namespace} and binds a new
 * value to it's given namespace. Because of delegation, rules for the given
 * namespace are the same as for `sofa.namespace`.
 *
 * As second argument you have to provide a constructor function that will be
 * bound to the given namespace.
 *
 * @example
 * // defining constructor for 'foo.bar'
 * sofa.define('foo.bar', function () {
 *  // some logic
 * });
 *
 * @example
 * // of course it's also possible to use named functions
 * var Greeter = function () {
 *  return {
 *    sayHello: function () {
 *      console.log('hello');
 *    }
 *  };
 * };
 *
 * sofa.define('greeter', Greeter);
 *
 * @param {string} namespace A namespace string e.g. 'sofa.services.FooService".
 * @param {function} fn A constructor function that will be bound to the namespace.
 */
sofa.define = function (namespace, fn) {
    sofa.namespace(namespace).bind(fn);
};

/**
 * @method inherits
 * @memberof sofa
 * @public
 *
 * @description
 * Sets up an inheritance chain between two objects
 * (See {@link https://github.com/isaacs/inherits/blob/master/inherits.js}).
 *
 * @example
 * // creating a constructor
 * function Child () {
 *   Child.super.call(this)
 *   console.error([this
 *                ,this.constructor
 *                ,this.constructor === Child
 *                ,this.constructor.super === Parent
 *                ,Object.getPrototypeOf(this) === Child.prototype
 *                ,Object.getPrototypeOf(Object.getPrototypeOf(this))
 *                 === Parent.prototype
 *                ,this instanceof Child
 *                ,this instanceof Parent])
 * }
 *
 * // creating another constructor
 * function Parent () {}
 *
 * sofa.inherits(Child, Parent)
 * // getting an instance
 * new Child
 *
 * @param {object} c Child constructor.
 * @param {object} p Parent constructor.
 * @param {object} proto Prototype object.
 */

 /*jshint asi: true*/
sofa.inherits = function (c, p, proto) {
    //this code uses a shitty form of semicolon less
    //writing. We just copied it from:
    //https://github.com/isaacs/inherits/blob/master/inherits.js

    proto = proto || {};
    var e = {};
    
    [c.prototype, proto].forEach(function (s) {
        Object.getOwnPropertyNames(s).forEach(function (k) {
            e[k] = Object.getOwnPropertyDescriptor(s, k);
        });
    });
    c.prototype = Object.create(p.prototype, e);
    c.super = p
};
/*jshint asi: false*/

'use strict';
/**
 * @name ConfigService
 * @class
 * @namespace sofa.ConfigService
 *
 * @description
 * General configuration service which kind of behaves as a registry
 * pattern to make configurations available on all layers.
 */
sofa.define('sofa.ConfigService', function () {

    var self = {};

    sofa.Config = sofa.Config || {};

    /**
     * @method getSupportedCountries
     * @memberof sofa.ConfigService
     *
     * @description
     * Gets an array of supported countries for shipping and invoicing.
     *
     * @example
     * // returns supported countries
     * sofa.ConfigService.getSupportedCountries();
     *
     * @return {array} Returns an array of strings for supported countries.
     */
    self.getSupportedCountries = function () {
        if (!sofa.Config.countries) {
            //should we rather throw an exception here?
            return [];
        }

        return sofa.Config.countries;
    };

    /**
     * @method getDefaultCountry
     * @memberof sofa.ConfigService
     *
     * @description
     * Gets the default country for shipping and invoicing.
     *
     * @example
     * // returns default country
     * sofa.ConfigService.getDefaultCountry();
     *
     * @return {string} Default country.
     */
    self.getDefaultCountry = function () {
        var countries = self.getSupportedCountries();
        return countries.length === 0 ? null : countries[0];
    };

    /**
     * @method getLocalizedPayPalButtonClass
     * @memberof sofa.ConfigService
     *
     * @description
     * Returns a localized paypal button css class.
     *
     * @example
     * sofa.ConfigService.getLocalizedPayPalButtonClass();
     *
     * @return {string} PayPal button class.
     */
    self.getLocalizedPayPalButtonClass = function (disabled) {
        return !disabled ? 'cc-paypal-button--' + self.get('locale') :
                           'cc-paypal-button--' + self.get('locale') + '--disabled';
    };

    /**
     * @method get
     * @memberof sofa.ConfigService
     *
     * @description
     * Generic getter function that returns a config value by a given key.
     * If a default value is passed and no config setting with the given key
     * exists, it is returned.
     *
     * @example
     * // returns config setting for 'foo'
     * sofa.ConfigService.get('foo');
     *
     * @example
     * // returns 5 if config for 'foo' doesn't exist
     * sofa.ConfigService.get('foo', 5);
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

'use strict';
/**
 * @name Product
 * @namespace sofa.models.Product
 *
 * @description
 * A model that represents a Product object and adds convenient methods to it.
 */
sofa.define('sofa.models.Product', function () {});

/**
 * @method getImage
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
        if (this.images[i].sizeName.toLowerCase() === size) {
            return this.images[i].url;
        }
    }

    return sofa.Config.mediaPlaceholder;
};

/**
 * @method getAllImages
 * @memberof sofa.models.Product
 *
 * @description
 * Returns all images of the product in size 'large'.
 *
 * @return {array} Arraz of image urls.
 */
sofa.models.Product.prototype.getAllImages = function () {

    if (!this._allImages) {
        this._allImages = [{ url: this.getImage('large') }].concat(this.imagesAlt);
    }

    return this._allImages;
};

/**
 * @method hasMultipleImages
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
 * @method hasBasePrice
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
 * @method getBasePrice
 * @memberof sofa.models.Product
 *
 * @description
 * Returns the base price per unit
 *
 * @return {Number}
 */
sofa.models.Product.prototype.getBasePriceStr = function () {
    return sofa.Util.toFixed(this.custom1, 2);
};

/**
 * @method hasUnit
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
 * @method getUnit
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
 * @method hasOldPrice
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
 * @method hasVariants
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
 * @method isOutOfStock
 * @memberof sofa.models.Product
 *
 * @description
 * Returns true if the product is currently out of stock.
 *
 * @return {boolean}
 */
sofa.models.Product.prototype.isOutOfStock = function () {

    //this means, it's always in stock
    if (this.qty === undefined || this.qty === null) {
        return false;
    }

    // a product is considered out of stock if:

    // -it has no variants and the qty is less or equal zero
    // -it has variants and all of them have a stock of less or equal zero

    return (!this.hasVariants() && this.qty <= 0) || this.areAllVariantsOutOfStock();
};

/**
 * @method areAllVariantsOutOfStock
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

sofa.define('sofa.QService', function () {
    /**
     * Constructs a promise manager.
     *
     * @param {function(function)} nextTick Function for executing functions in the next turn.
     * @param {function(...*)} exceptionHandler Function into which unexpected exceptions are passed for
     *     debugging purposes.
     * @returns {object} Promise manager.
     */
    function qFactory(nextTick, exceptionHandler) {

        /**
        * @ngdoc
        * @name ng.$q#defer
        * @methodOf ng.$q
        * @description
        * Creates a `Deferred` object which represents a task which will finish in the future.
        *
        * @returns {Deferred} Returns a new instance of deferred.
        */
        var defer = function () {
            var pending = [],
                value, deferred;

            deferred = {

                resolve: function (val) {
                    if (pending) {
                        var callbacks = pending;
                        pending = undefined;
                        value = ref(val);

                        if (callbacks.length) {
                            nextTick(function () {
                                var callback;
                                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                                    callback = callbacks[i];
                                    value.then(callback[0], callback[1], callback[2]);
                                }
                            });
                        }
                    }
                },


                reject: function (reason) {
                    deferred.resolve(reject(reason));
                },


                notify: function (progress) {
                    if (pending) {
                        var callbacks = pending;

                        if (pending.length) {
                            nextTick(function () {
                                var callback;
                                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                                    callback = callbacks[i];
                                    callback[2](progress);
                                }
                            });
                        }
                    }
                },


                promise: {
                    then: function (callback, errback, progressback) {
                        var result = defer();

                        var wrappedCallback = function (value) {
                            try {
                                result.resolve((callback || defaultCallback)(value));
                            } catch (e) {
                                exceptionHandler(e);
                                result.reject(e);
                            }
                        };

                        var wrappedErrback = function (reason) {
                            try {
                                result.resolve((errback || defaultErrback)(reason));
                            } catch (e) {
                                exceptionHandler(e);
                                result.reject(e);
                            }
                        };

                        var wrappedProgressback = function (progress) {
                            try {
                                result.notify((progressback || defaultCallback)(progress));
                            } catch (e) {
                                exceptionHandler(e);
                            }
                        };

                        if (pending) {
                            pending.push([wrappedCallback, wrappedErrback, wrappedProgressback]);
                        } else {
                            value.then(wrappedCallback, wrappedErrback, wrappedProgressback);
                        }

                        return result.promise;
                    },
                    always: function (callback) {

                        function makePromise(value, resolved) {
                            var result = defer();
                            if (resolved) {
                                result.resolve(value);
                            } else {
                                result.reject(value);
                            }
                            return result.promise;
                        }

                        function handleCallback(value, isResolved) {
                            var callbackOutput = null;
                            try {
                                callbackOutput = (callback || defaultCallback)();
                            } catch (e) {
                                return makePromise(e, false);
                            }
                            if (callbackOutput && callbackOutput.then) {
                                return callbackOutput.then(function () {
                                    return makePromise(value, isResolved);
                                }, function (error) {
                                    return makePromise(error, false);
                                });
                            } else {
                                return makePromise(value, isResolved);
                            }
                        }

                        return this.then(function (value) {
                            return handleCallback(value, true);
                        }, function (error) {
                            return handleCallback(error, false);
                        });
                    }
                }
            };

            return deferred;
        };


        var ref = function (value) {
            if (value && value.then) {
                return value;
            }
            return {
                then: function (callback) {
                    var result = defer();
                    nextTick(function () {
                        result.resolve(callback(value));
                    });
                    return result.promise;
                }
            };
        };


        /**
        * @ngdoc
        * @name ng.$q#reject
        * @methodOf ng.$q
        * @description
        * Creates a promise that is resolved as rejected with the specified `reason`. This api should be
        * used to forward rejection in a chain of promises. If you are dealing with the last promise in
        * a promise chain, you don't need to worry about it.
        *
        * When comparing deferreds/promises to the familiar behavior of try/catch/throw, think of
        * `reject` as the `throw` keyword in JavaScript. This also means that if you "catch" an error via
        * a promise error callback and you want to forward the error to the promise derived from the
        * current promise, you have to "rethrow" the error by returning a rejection constructed via
        * `reject`.
        *
        * <pre>
        *   promiseB = promiseA.then(function(result) {
        *     // success: do something and resolve promiseB
        *     //          with the old or a new result
        *     return result;
        *   }, function(reason) {
        *     // error: handle the error if possible and
        *     //        resolve promiseB with newPromiseOrValue,
        *     //        otherwise forward the rejection to promiseB
        *     if (canHandle(reason)) {
        *      // handle the error and recover
        *      return newPromiseOrValue;
        *     }
        *     return $q.reject(reason);
        *   });
        * </pre>
        *
        * @param {*} reason Constant, message, exception or an object representing the rejection reason.
        * @returns {Promise} Returns a promise that was already resolved as rejected with the `reason`.
        */
        var reject = function (reason) {
            return {
                then: function (callback, errback) {
                    var result = defer();
                    nextTick(function () {
                        result.resolve((errback || defaultErrback)(reason));
                    });
                    return result.promise;
                }
            };
        };


        /**
        * @ngdoc
        * @name ng.$q#when
        * @methodOf ng.$q
        * @description
        * Wraps an object that might be a value or a (3rd party) then-able promise into a $q promise.
        * This is useful when you are dealing with an object that might or might not be a promise, or if
        * the promise comes from a source that can't be trusted.
        *
        * @param {*} value Value or a promise
        * @returns {Promise} Returns a promise of the passed value or promise
        */
        var when = function (value, callback, errback, progressback) {
            var result = defer(),
                done;

            var wrappedCallback = function (value) {
                try {
                    return (callback || defaultCallback)(value);
                } catch (e) {
                    exceptionHandler(e);
                    return reject(e);
                }
            };

            var wrappedErrback = function (reason) {
                try {
                    return (errback || defaultErrback)(reason);
                } catch (e) {
                    exceptionHandler(e);
                    return reject(e);
                }
            };

            var wrappedProgressback = function (progress) {
                try {
                    return (progressback || defaultCallback)(progress);
                } catch (e) {
                    exceptionHandler(e);
                }
            };

            nextTick(function () {
                ref(value).then(function (value) {
                    if (done) {
                        return;
                    }
                    done = true;
                    result.resolve(ref(value).then(wrappedCallback, wrappedErrback, wrappedProgressback));
                }, function (reason) {
                    if (done) {
                        return;
                    }
                    done = true;
                    result.resolve(wrappedErrback(reason));
                }, function (progress) {
                    if (done) {
                        return;
                    }
                    result.notify(wrappedProgressback(progress));
                });
            });

            return result.promise;
        };


        function defaultCallback(value) {
            return value;
        }


        function defaultErrback(reason) {
            return reject(reason);
        }


        /**
        * @ngdoc
        * @name ng.$q#all
        * @methodOf ng.$q
        * @description
        * Combines multiple promises into a single promise that is resolved when all of the input
        * promises are resolved.
        *
        * @param {Array.<Promise>|Object.<Promise>} promises An array or hash of promises.
        * @returns {Promise} Returns a single promise that will be resolved with an array/hash of values,
        *   each value corresponding to the promise at the same index/key in the `promises` array/hash. If any of
        *   the promises is resolved with a rejection, this resulting promise will be resolved with the
        *   same rejection.
        */
        function all(promises) {
            var deferred = defer(),
                counter = 0,
                /* global isArray: true */
                results = isArray(promises) ? [] : {};

            /* global forEach: true */
            forEach(promises, function (promise, key) {
                counter++;
                ref(promise).then(function (value) {
                    if (results.hasOwnProperty(key)) {
                        return;
                    }
                    results[key] = value;
                    if (!(--counter)) {
                        deferred.resolve(results);
                    }
                }, function (reason) {
                    if (results.hasOwnProperty(key)) {
                        return;
                    }
                    deferred.reject(reason);
                });
            });

            if (counter === 0) {
                deferred.resolve(results);
            }

            return deferred.promise;
        }

        return {
            defer: defer,
            reject: reject,
            when: when,
            all: all
        };
    }


    return qFactory(function (fn) {
        //This is because this service is an Angular rip off. In Angular they
        //use this hook to trigger the dirty checking. For us it's a noop.
        //We just don't want to change the code too much so that we can maintain
        //compatibility to the Angular $q service easily.
        fn();
    }, function (err) {
        //That's the exceptionHandler. For now, just dump all exceptions on the console
        console.log(err);
    });
});

'use strict';
/* global document: true */
/* global keys: true */
/* global toString: true */
/* global isEqual: true */
/**
 * @name Util
 * @namespace sofa.Util
 *
 * @description
 * Namespace containing utility functions for compatibility stuff etc.
 *
 */
sofa.Util = {
    /**
     * @method isToFixedBroken
     * @memberof sofa.Util
     *
     * @description
     * Checks if the <code>toFixed()</code> function in the current JavaScript
     * environment is broken or not. For more info see {@link http://docs.sencha.com/touch/2.2.0/source/Number2.html#Ext-Number-method-toFixed }.
     *
     * @return {boolean} Whether its broken or not.
     */
    isToFixedBroken: (0.9).toFixed() !== '1',
    indicatorObject: {},

    /**
     * @member {object} objectTypes
     * @memberof sofa.Util
     *
     * @description
     * Used to determine if values are of the language type Object
     */
    objectTypes: {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    },

    /**
     * @method domReady
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
     * @method round
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
     * @method toFixed
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
     * @method clone
     * @memberof sofa.Util
     *
     * @description
     * This method is useful for cloning complex (read: nested) objects without
     * having references from the clone to the original object.
     * (See {@link http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object}).
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
     * @method extend
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
        return toString.call(value) === '[object Array]';
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
    Array: {
        /**
        * @method remove
        * @public
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
    }
};

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

}(window));
