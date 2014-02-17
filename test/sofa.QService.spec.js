'use strict';

describe('sofa.core', function () {

    describe('sofa.QService', function () {
        
        var q;
        
        beforeEach(function () {
            q = new sofa.QService();
        });

        it('should be defined', function () {
            expect(q).toBeDefined();
        });

        it('should have a method defer', function () {
            expect(q.defer).toBeDefined();
        });

        describe('sofa.QService#defer', function () {

            it('should be a function', function () {
                expect(typeof q.defer).toBe('function');
            });

            it('should return an object', function () {
                expect(typeof q.defer()).toBe('object');
            });

            it('should create deferred', function () {
                var deferred = q.defer();
                expect(deferred).toBeDefined();
            });

            describe('deferredObject', function () {

                var deferred;

                beforeEach(function () {
                    deferred = q.defer();
                });

                it('should have a method resolve', function () {
                    expect(deferred.resolve).toBeDefined();
                });

                it('should have a method reject', function () {
                    expect(deferred.reject).toBeDefined();
                });

                it('should resolve synchonously', function () {
                    deferred.resolve(true);
                    deferred.promise.then(function (data) {
                        expect(data).toBe(true);
                    });
                });
            });
        });
    });
});
