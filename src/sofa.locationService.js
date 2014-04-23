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
