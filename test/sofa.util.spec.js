'use strict';

describe('sofa.core', function () {

    describe('sofa.Util', function () {

        var util;

        beforeEach(function () {
            util = sofa.Util;
        });

        it('should be defined', function () {
            expect(util).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof util).toBe('object');
        });

        it('should have a property isToFixedBroken', function () {
            expect(util.isToFixedBroken).toBeDefined();
        });

        it('should have a property indicatorObject', function () {
            expect(util.indicatorObject).toBeDefined();
        });

        it('should have a property objectTypes', function () {
            expect(util.objectTypes).toBeDefined();
        });

        it('should have a method domReady', function () {
            expect(util.domReady).toBeDefined();
        });

        it('should have a method round', function () {
            expect(util.round).toBeDefined();
        });

        it('should have have a method toFixed', function () {
            expect(util.toFixed).toBeDefined();
        });

        it('should have a method clone', function () {
            expect(util.clone).toBeDefined();
        });

        it('should have a method extend', function () {
            expect(util.extend).toBeDefined();
        });

        it('should have a method createCallback', function () {
            expect(util.createCallback).toBeDefined();
        });

        it('should have a method findKey', function () {
            expect(util.findKey).toBeDefined();
        });

        it('should have a method find', function () {
            expect(util.find).toBeDefined();
        });

        it('should have a method every', function () {
            expect(util.every).toBeDefined();
        });

        it('should have a method forOwn', function () {
            expect(util.forOwn).toBeDefined();
        });

        it('should have a method debounce', function () {
            expect(util.debounce).toBeDefined();
        });

        it('should have a method isObject', function () {
            expect(util.isObject).toBeDefined();
        });

        it('should have a method isNumber', function () {
            expect(util.isNumber).toBeDefined();
        });

        it('should have a method isNumeric', function () {
            expect(util.isNumeric).toBeDefined();
        });

        it('should have a method isArray', function () {
            expect(util.isArray).toBeDefined();
        });

        it('should have a method isFunction', function () {
            expect(util.isFunction).toBeDefined();
        });

        it('should have a method isString', function () {
            expect(util.isString).toBeDefined();
        });

        it('should have a method isUndefined', function () {
            expect(util.isUndefined).toBeDefined();
        });

        it('should have a method createGuid', function () {
            expect(util.createGuid).toBeDefined();
        });

        it('should have a method capitalize', function () {
            expect(util.capitalize).toBeDefined();
        });

        it('should have an Array util', function () {
            expect(util.Array).toBeDefined();
        });

        it('should have a method toJson', function () {
            expect(util.toJson).toBeDefined();
        });

        describe('sofa.Util#domReady', function () {

            it('should be a function', function () {
                expect(typeof util.domReady).toBe('function');
            });
        });

        describe('sofa.Util#round', function () {

            it('should be a function', function () {
                expect(typeof util.round).toBe('function');
            });

            it('should return a number', function () {
                expect(typeof util.round(4)).toBe('number');
            });

            it('should apply places', function () {
                expect(util.round(4, 2)).toEqual(4.00);
            });
        });

        describe('sofa.Util#toFixed', function () {

            it('should be a function', function () {
                expect(typeof util.toFixed).toBe('function');
            });

            it('should return a string', function () {
                expect(typeof util.toFixed(4.00)).toBe('string');
            });

            it('should transform given value to a fixed value', function () {
                expect(util.toFixed(4.00)).toBe('4');
            });
        });

        describe('sofa.Util#clone', function () {

            it('should be a function', function () {
                expect(typeof util.clone).toBe('function');
            });

            it('should should return an object', function () {
                var obj = {};
                expect(typeof util.clone(obj)).toBe('object');
            });

            it('should clone an object', function () {
                var obj = {
                    foo: 'bar'
                };
                expect(util.clone(obj)).toEqual({
                    foo: 'bar'
                });
            });
        });

        describe('sofa.Util#extend', function () {

            it('should be a function', function () {
                expect(typeof util.extend).toBe('function');
            });

            it('should return an object', function () {
                expect(typeof util.extend({}, { foo: 'bar' })).toBe('object');
            });

            it('should extend an object', function () {
                expect(util.extend({}, { foo: 'bar' })).toEqual({
                    foo: 'bar'
                });
            });
        });

        describe('sofa.Util#createCallback', function () {

            it('should be function', function () {
                expect(typeof util.createCallback).toBe('function');
            });

            it('should return a function', function () {
                expect(typeof util.createCallback(function () {})).toBe('function');
            });
        });

        describe('sofa.Util#findKey', function () {

            it('should be a function', function () {
                expect(typeof util.findKey).toBe('function');
            });
        });

        describe('sofa.Util#find', function () {

            it('should be a function', function () {
                expect(typeof util.find).toBe('function');
            });
        });

        describe('sofa.Util#every', function () {

            it('should be a function', function () {
                expect(typeof util.every).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.every({}, function () {
                    return true;
                })).toBe('boolean');
            });

            it('should return true if every iterator returns true', function () {
                var testData = [{
                    qty: 1
                }, {
                    qty: 1
                }, {
                    qty: 1
                }];

                var result = util.every(testData, function (item) {
                    return item.qty === 1;
                });

                var proof = util.every(testData, function (item) {
                    return item.qty < 1;
                });

                expect(result).toBe(true);
                expect(proof).toBe(false);
            });

            it('should return false if every iterator returns false', function () {
                var testData = [{
                    qty: 1
                }, {
                    qty: 2
                }, {
                    qty: 1
                }];

                var result = util.every(testData, function (item) {
                    return item.qty === 1;
                });

                expect(result).toBe(false);
            });
        });

        describe('sofa.Util#forOwn', function () {

            it('should be a function', function () {
                expect(typeof util.forOwn).toBe('function');
            });
        });

        describe('sofa.Util#debounce', function () {

            it('should be a function', function () {
                expect(typeof util.debounce).toBe('function');
            });
        });

        describe('sofa.Util#isObject', function () {

            it('should be a function', function () {
                expect(typeof util.isObject).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isObject()).toBe('boolean');
            });

            it('should return true if given arg is an object', function () {
                expect(util.isObject({})).toBe(true);
            });
        });

        describe('sofa.Util#isNumber', function () {

            it('should be a function', function () {
                expect(typeof util.isNumber).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isNumber()).toBe('boolean');
            });

            it('should return true if given arg is a number', function () {
                expect(util.isNumber(3)).toBe(true);
            });

            it('should return false if given arg is not a number', function () {
                expect(util.isNumber('String')).toBe(false);
            });
        });

        describe('sofa.Util#isNumeric', function () {

            it('should be a function', function () {
                expect(typeof util.isNumeric).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isNumeric()).toBe('boolean');
            });

            it('should return true if given arg is numeric', function () {
                expect(util.isNumeric(3)).toBe(true);
            });

            it('should return false if given arg is not numeric', function () {
                expect(util.isNumeric('String')).toBe(false);
            });
        });

        describe('sofa.Util#isArray', function () {

            it('should be a function', function () {
                expect(typeof util.isArray).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isArray()).toBe('boolean');
            });

            it('should return true if given arg is an array', function () {
                expect(util.isArray([])).toBe(true);
            });

            it('should return false if given arg is not an array', function () {
                expect(util.isArray('String')).toBe(false);
            });
        });

        describe('sofa.Util#isFunction', function () {

            it('should be a function', function () {
                expect(typeof util.isFunction).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isFunction()).toBe('boolean');
            });

            it('should return true if given arg is a Function', function () {
                expect(util.isFunction(function () {})).toBe(true);
            });

            it('should return false if given arg is not a function', function () {
                expect(util.isFunction('String')).toBe(false);
            });
        });

        describe('sofa.Util#isString', function () {

            it('should be a function', function () {
                expect(typeof util.isString).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isString()).toBe('boolean');
            });

            it('should return true if given arg is a string', function () {
                expect(util.isString('')).toBe(true);
            });

            it('should return false if given arg is not a string', function () {
                expect(util.isString({})).toBe(false);
            });
        });

        describe('sofa.Util#isUndefined', function () {

            it('should be a function', function () {
                expect(typeof util.isUndefined).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof util.isUndefined()).toBe('boolean');
            });

            it('should return true if given arg is undefined', function () {
                expect(util.isUndefined(undefined)).toBe(true);
            });

            it('should return false if given arg is not undefined', function () {
                expect(util.isUndefined({})).toBe(false);
            });
        });

        describe('sofa.Util#createGuid', function () {

            it('should be a function', function () {
                expect(typeof util.createGuid).toBe('function');
            });

            it('should return a string', function () {
                expect(typeof util.createGuid()).toBe('string');
            });

            it('should return a unique id', function () {
                expect(util.createGuid()).not.toBe(util.createGuid());
            });
        });

        describe('sofa.Util#capitalize', function () {

            it('should be a function', function () {
                expect(typeof util.capitalize).toBe('function');
            });

            it('should return a string', function () {
                expect(typeof util.capitalize('foo')).toBe('string');
            });

            it('should capitalize given string', function () {
                expect(util.capitalize('foo')).toEqual('Foo');
            });
        });

        describe('sofa.Util#Array', function () {

            it('should be an object', function () {
                expect(typeof util.Array).toBe('object');
            });

            it('should have a method remove', function () {
                expect(util.Array.remove).toBeDefined();
            });

            describe('sofa.Util.Array#remove', function () {

                it('should be a function', function () {
                    expect(typeof util.Array.remove).toBe('function');
                });

                it('should return an array', function () {
                    expect(typeof util.Array.remove([1, 2, 3]).length).toBeDefined();
                });

                it('should remove an item of given array', function () {
                    expect(util.Array.remove([1, 2, 3], 3)).toEqual([1, 2]);
                });
            });
        });

        describe('sofa.Util#toJson', function () {

            it('should be a function', function () {
                expect(typeof util.toJson).toBe('function');
            });

            it('should return an object', function () {
                expect(typeof util.toJson({})).toBe('object');
            });

            it('should parse a string to json', function () {
                expect(util.toJson('({ "foo": "bar" })')).toEqual({
                    foo: 'bar'
                });
            });
        });
    });
});
