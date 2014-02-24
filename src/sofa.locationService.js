'use strict';
/**
 * @name LocationService
 * @class
 * @namespace sofa.LocationService
 *
 * @description
 * Service to work with the browsers location.
 */
sofa.define('sofa.LocationService', function () {

    return {
        /**
         * @method path
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
