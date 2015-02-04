require('shared-sofa-component-tasks')(require('gulp'), {
    pkg: require('./package.json'),
    baseDir: __dirname,
    testDepedencyFiles: [
        'node_modules/sofa-testing/mocks/sofa.config.mock.js'
    ],
    sourceFiles: []
});
