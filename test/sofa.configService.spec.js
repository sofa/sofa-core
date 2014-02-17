'use strict';

describe('sofa.core', function () {

    describe('sofa.ConfigService', function () {

        var configService;

        beforeEach(function () {
            configService = new sofa.ConfigService();
        });

        it('should be defined', function () {
            expect(configService).toBeDefined();
        });

        it('should be an object', function () {
            expect(typeof configService).toBe('object');
        });

        it('should have a method getSupportedCountries', function () {
            expect(configService.getSupportedCountries).toBeDefined();
        });

        it('should have a method getDefaultCountry', function () {
            expect(configService.getDefaultCountry).toBeDefined();
        });

        it('should have a method getLocalizedPayPalButtonClass', function () {
            expect(configService.getLocalizedPayPalButtonClass).toBeDefined();
        });

        it('should have a method get', function () {
            expect(configService.get).toBeDefined();
        });

        describe('sofa.ConfigService#getSupportedCountries', function () {

            it('should be a function', function () {
                expect(typeof configService.getSupportedCountries).toBe('function');
            });

            it('should return an array', function () {
                expect(configService.getSupportedCountries().length).toBeDefined();
            });

            it('should return configured supported countries', function () {
                expect(configService.getSupportedCountries()).toEqual(sofa.Config.countries);
            });
        });

        describe('sofa.ConfigService#getDefaultCountry', function () {
        
            it('should be a function', function () {
                expect(typeof configService.getDefaultCountry).toBe('function');
            });

            it('should return an object', function () {
                expect(typeof configService.getDefaultCountry()).toBe('object');
            });

            it('should return configured default country', function () {
                expect(configService.getDefaultCountry()).toEqual({
                    'value': 'DE',
                    'label': 'Deutschland'
                });
            });
        });

        describe('sofa.ConfigService#getLocalizedPayPalButtonClass', function () {

            it('should be a function', function () {
                expect(typeof configService.getLocalizedPayPalButtonClass).toBe('function');
            });

            it('should return a string', function () {
                expect(typeof configService.getLocalizedPayPalButtonClass()).toBe('string');
            });
        });

        describe('sofa.ConfigService#get', function () {

            it('should be a function', function () {
                expect(typeof configService.get).toBe('function');
            });

            it('should return a value by given key', function () {
                expect(configService.get('storeCode')).toEqual('53787');
            });
        });
    });
});
