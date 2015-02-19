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

        describe('sofa.models.Category#getUrl', function () {
            var category = new sofa.models.Category({});

            category.route = '/some/category.html';

            it('should return the category\'s URL', function () {
                expect(category.getUrl()).toBe('/some/category.html');
            });
        });

    });
});
