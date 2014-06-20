'use strict';

describe('sofa.core', function () {

    describe('sofa.models.Category', function () {

        var category;

        beforeEach(function () {
            category = new sofa.models.Category(sofa.Config);
        });

        it('should be defined', function () {
            expect(category).toBeDefined();
        });

        describe('sofa.models.Product#getOriginFullUrl', function () {
            var category = new sofa.models.Category(sofa.Config);
            category.originFullUrl = 'full/url';
            category.urlId = 'full-url';

            it('should return full url', function () {
                sofa.Config.useShopUrls = true;
                expect(category.getOriginFullUrl()).toBe(category.originFullUrl);
            });

            it('should return fallback url', function () {
                sofa.Config.useShopUrls = false;
                expect(category.getOriginFullUrl()).toBe(category.urlId);
            });
        });
    });
});
