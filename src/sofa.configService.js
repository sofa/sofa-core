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
