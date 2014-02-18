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
