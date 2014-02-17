'use strict';

describe('sofa.core', function () {

    describe('sofa.Observable', function () {

        var observable;

        beforeEach(function () {
            observable = new sofa.Observable();
        });

        it('should be defined', function () {
            expect(observable).toBeDefined();
        });

        it('should have a method mixin', function () {
            expect(observable.mixin).toBeDefined();
        });

        describe('sofa.Observable#mixin', function () {

            it('should be a function', function () {
                expect(typeof observable.mixin).toBe('function');
            });

            it('should return an object', function () {
                expect(typeof observable.mixin({})).toBe('object');
            });

            describe('mixinObject', function () {

                var mixin;

                beforeEach(function () {
                    mixin = observable.mixin({});
                });

                it('should have a method on', function () {
                    expect(mixin.on).toBeDefined();
                });

                it('should have a method once', function () {
                    expect(mixin.once).toBeDefined();
                });

                it('should have a method off', function () {
                    expect(mixin.off).toBeDefined();
                });

                it('should have a method emit', function () {
                    expect(mixin.emit).toBeDefined();
                });
            });
        });
    });
});
