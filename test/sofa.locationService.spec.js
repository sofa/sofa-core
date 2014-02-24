'use strict';
/* global sofa */

describe('sofa.LocationService', function () {

    var locationService;

    beforeEach(function () {
        locationService = new sofa.LocationService();
    });

    it('should be defined', function () {
        expect(locationService).toBeDefined();
    });

    it('should have a method path', function () {
        expect(locationService.path).toBeDefined();
    });

    describe('sofa.LocationService#path', function () {

        it('should be a function', function () {
            expect(typeof locationService.path).toBe('function');
        });

        it('should return a string', function () {
            expect(typeof locationService.path()).toBe('string');
        });
    });
});
