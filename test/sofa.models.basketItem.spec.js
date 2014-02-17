'use strict';

describe('sofa.core', function () {

    describe('sofa.models.BasketItem', function () {

        var basketItem,
            product;

        beforeEach(function () {
            product = new sofa.models.Product();
            product.price = 9;

            basketItem = new sofa.models.BasketItem();
            basketItem.product = product;
            basketItem.variant = {
                price: 10
            };
            basketItem.quantity = 2;
        });

        it('should be defined', function () {
            expect(basketItem).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof basketItem).toBe('object');
        });

        it('should have a method getPrice', function () {
            expect(basketItem.getPrice).toBeDefined();
        });

        it('should have a method getTotal', function () {
            expect(basketItem.getTotal).toBeDefined();
        });

        it('should have a method getVariantID', function () {
            expect(basketItem.getVariantID).toBeDefined();
        });

        it('should have a method getOptionID', function () {
            expect(basketItem.getOptionID).toBeDefined();
        });

        describe('sofa.models.BasketItem#getPrice', function () {

            it('should be a function', function () {
                expect(typeof basketItem.getPrice).toBe('function');
            });

            it('should return a string', function () {
                expect(typeof basketItem.getPrice()).toBe('number');
            });
        });

        describe('sofa.models.BasketItem#getTotal', function () {

            it('should be a function', function () {
                expect(typeof basketItem.getTotal).toBe('function');
            });

            it('should return a number', function () {
                expect(typeof basketItem.getTotal()).toBe('number');
            });

            it('should calculate total', function () {
                expect(basketItem.getTotal()).toBe(20);
            });

            it('should calculate total even if price is string', function () {
                basketItem.variant.price = '10';
                expect(basketItem.getTotal()).toBe(20);
            });
        });
    });
});
