'use strict';

describe('sofa.core', function () {

    it('should run tests', function () {
        expect(true).toBe(true);
    });

    describe('sofa', function () {

        it('should be defined', function () {
            expect(sofa).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof sofa).toBe('object');
        });

        it('should have a method namespace', function () {
            expect(sofa.namespace).toBeDefined();
        });

        it('should have a method define', function () {
            expect(sofa.define).toBeDefined();
        });

        it('should have a method inherits', function () {
            expect(sofa.inherits).toBeDefined();
        });

        describe('sofa#namespace', function () {

            it('should be a function', function () {
                expect(typeof sofa.namespace).toBe('function');
            });

            it('should return and object', function () {
                expect(typeof sofa.namespace('foo')).toBe('object');
            });

            describe('namespaceObject', function () {

                var ns;

                beforeEach(function () {
                    ns = sofa.namespace('foo');
                });

                it('should have a targetParent', function () {
                    expect(ns.targetParent).toBeDefined();
                });

                it('should have targetName', function () {
                    expect(ns.targetName).toBeDefined();
                });

                it('should have a method bind', function () {
                    expect(ns.bind).toBeDefined();
                });

                describe('namespaceObject#targetParent', function () {

                    it('should be an object', function () {
                        expect(typeof ns.targetParent).toBe('object');
                    });
                });

                describe('namespaceObject#targetName', function () {

                    it('should be a string', function () {
                        expect(typeof ns.targetName).toBe('string');
                    });
                });

                describe('namespaceObject#bind', function () {

                    it('should be a function', function () {
                        expect(typeof ns.bind).toBe('function');
                    });
                });
            });
        });

        describe('sofa#define', function () {

            it('should be a function', function () {
                expect(typeof sofa.define).toBe('function');
            });

            it('should bind a constructor to given namespace', function () {
                sofa.define('bar', function () {});
                expect(sofa.bar).toBeDefined();
                expect(typeof sofa.bar).toBe('function');
            });
        });

        describe('sofa#inherits', function () {

            it('should be a function', function () {
                expect(typeof sofa.inherits).toBe('function');
            });
        });
    });
});
