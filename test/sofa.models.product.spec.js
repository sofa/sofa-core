'use strict';

describe('sofa.core', function () {

    describe('sofa.models.Product', function () {

        var product;

        beforeEach(function () {
            product = new sofa.models.Product();
        });

        it('should be defined', function () {
            expect(product).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof product).toBe('object');
        });

        it('should have a method getImage', function () {
            expect(product.getImage).toBeDefined();
        });

        it('should have a method getAllImages', function () {
            expect(product.getAllImages).toBeDefined();
        });

        it('should have a method hasOldPrice', function () {
            expect(product.hasOldPrice).toBeDefined();
        });

        it('should have a method hasVariants', function () {
            expect(product.hasVariants).toBeDefined();
        });

        it('should have a method isOutOfStock', function () {
            expect(product.isOutOfStock).toBeDefined();
        });

        it('should have a method areAllVariantsOutOfStock', function () {
            expect(product.areAllVariantsOutOfStock).toBeDefined();
        });

        describe('sofa.models.Product#hasBasePrice', function () {
            it('should return true', function () {
                product.custom1 = 1;
                expect(product.hasBasePrice()).toBe(true);
            });

            it('should return false', function () {
                product.custom1 = 0;
                expect(product.hasBasePrice()).toBe(false);

                delete product.custom1;
                expect(product.hasBasePrice()).toBe(false);
            });
        });

        describe('sofa.models.Product#getBasePriceStr', function () {

            it('should return 10.00', function () {
                product.custom1 = 10;
                expect(product.getBasePriceStr()).toBe('10.00');
            });
        });

        describe('sofa.models.Product#hasUnit', function () {
            it('should return true', function () {
                product.custom3 = 'Kg';
                expect(product.hasUnit()).toBe(true);
            });

            it('should return true', function () {
                product.custom3 = '';
                expect(product.hasUnit()).toBe(false);
                delete product.custom3;
                expect(product.hasUnit()).toBe(false);
            });

            it('should return false', function () {
                product.custom1 = 0;
                expect(product.hasBasePrice()).toBe(false);

                delete product.custom1;
                expect(product.hasBasePrice()).toBe(false);
            });
        });

        describe('sofa.models.Product#getUnit', function () {
            it('should return "Kg"', function () {
                product.custom3 = 'Kg';
                expect(product.getUnit()).toBe('Kg');
            });
        });

        describe('sofa.models.Product#getImage', function () {

            it('should be a function', function () {
                expect(typeof product.getImage).toBe('function');
            });

            it('should should return a string', function () {
                product.images = [];
                expect(typeof product.getImage()).toBe('string');
            });
        });

        describe('sofa.models.Product#getAllImages', function () {

            it('should be a function', function () {
                expect(typeof product.getAllImages).toBe('function');
            });

            it('should return an object', function () {
                product.images = [];
                expect(typeof product.getAllImages()).toBe('object');
            });
        });

        describe('sofa.models.Product#hasMultipleImages', function () {

            it('should be a function', function () {
                expect(typeof product.hasMultipleImages).toBe('function');
            });

            it('should return a boolean', function () {
                product.images = [];
                expect(typeof product.hasMultipleImages()).toBe('boolean');
            });
        });

        describe('sofa.models.Product#hasOldPrice', function () {

            it('should be a function', function () {
                expect(typeof product.hasOldPrice).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof product.hasOldPrice()).toBe('boolean');
            });
        });

        describe('sofa.models.Product#hasVariants', function () {

            it('should be a function', function () {
                expect(typeof product.hasVariants).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof product.hasVariants()).toBe('boolean');
            });
        });

        describe('sofa.models.Product#hasAttributes', function () {

            it('should be false', function () {
                product.attributes = {};
                expect(product.hasAttributes()).toBe(false);
            });

            it('should be true', function () {
                product.attributes = { color: 'red' };
                expect(product.hasAttributes()).toBe(true);
            });
        });

        describe('sofa.models.Product#isOutOfStock', function () {

            it('should be a function', function () {
                expect(typeof product.isOutOfStock).toBe('function');
            });

            it('should return a boolean', function () {
                expect(typeof product.isOutOfStock()).toBe('boolean');
            });

            it('should mark as out of stock', function () {
                product.qty = 0;
                expect(product.isOutOfStock()).toBe(true);
                product.qty = -1;
                expect(product.isOutOfStock()).toBe(true);
            });

            it('should mark as out of stock if all variants all of stock', function () {
                product.qty = 1;
                product.variants = [{
                    stock: 0
                },
                {
                    stock: 0
                }];

                expect(product.isOutOfStock()).toBe(true);
            });

            it('should mark as in stock', function () {
                product.qty = 1;
                expect(product.isOutOfStock()).toBe(false);

                product.variants = [{
                    stock: 1
                },
                {
                    stock: 0
                }];

                expect(product.isOutOfStock()).toBe(false);
            });

            it('should mark as in stock if even one variant is', function () {
                product.qty = 0;
                product.variants = [{
                    stock: 1
                },
                {
                    stock: 0
                }];

                expect(product.isOutOfStock()).toBe(false);
            });

            it('should mark as in stock if no qty is given', function () {
                expect(product.isOutOfStock()).toBe(false);
            });
        });
    });
});
