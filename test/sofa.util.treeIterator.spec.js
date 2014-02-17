'use strict';

describe('sofa.core', function () {

    describe('sofa.util.TreeIterator', function () {

        var iterator,
            categories;

        beforeEach(function () {
            categories = {
                'label': 'parent',
                'children': [{
                    'label': 'child 1',
                    'children': [{
                        'label': 'grandchild 1',
                    }, {
                        'label': 'grandchild 2',
                    }, {
                        'label': 'grandchild 3',
                    }]
                }, {
                    'label': 'child 2',
                    'children': [{
                        'label': 'grandchild 4',
                    }, {
                        'label': 'grandchild 5',
                    }]
                }]
            };

            iterator = new sofa.util.TreeIterator(categories, 'children');
        });

        it('should be defined', function () {
            expect(iterator).toBeDefined();
        });

        it('should have a method iterateChildren', function () {
            expect(iterator.iterateChildren).toBeDefined();
        });

        describe('sofa.util.TreeIterator.iterateChildren', function () {

            it('should be a function', function () {
                expect(typeof iterator.iterateChildren).toBe('function');
            });

            it('should loop the children of categories using tree algorithm', function () {
                var results = [];

                iterator.iterateChildren(function (category, parent) {
                    results.push({
                        category: category,
                        parent: parent
                    });
                });
                expect(results[0].category.label === 'parent').toBe(true);
                expect(results[0].parent === undefined).toBe(true);

                expect(results[1].category.label === 'child 1').toBe(true);
                expect(results[1].parent === categories).toBe(true);

                expect(results[2].category.label === 'grandchild 1').toBe(true);
                expect(results[2].parent === categories.children[0]).toBe(true);

                expect(results[3].category.label === 'grandchild 2').toBe(true);
                expect(results[3].parent === categories.children[0]).toBe(true);

                expect(results[results.length - 1].category.label === 'grandchild 5').toBe(true);
                expect(results[results.length - 1].parent === categories.children[1]).toBe(true);
            });
        });
    });
});
