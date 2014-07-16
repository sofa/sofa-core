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
 * <example name="example-sofa-namespace">
 *  <file name="index.html">
 *      Hello
 *  </file>
 *  <file name="app.js">
 *      var foo = 'bar';
 *      alert('Hi ingo');
 *  </file>
 * </example>
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
