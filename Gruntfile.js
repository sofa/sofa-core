'use strict';
/* jshint camelcase: false */

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        component_name: 'sofa.core',
        component_sass_name: grunt.file.readJSON('bower.json').name,
        build_dir: 'dist',

        clean: {
            build: {
                src: '<%= build_dir %>'
            }
        },

        html2js: {
            src: {
                options: {
                    base: 'src'
                },
                src: ['src/**/*.tpl.html'],
                dest: '<%= build_dir %>/<%= component_name %>.templates.js',
                module: '<%= component_name %>.templates'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            src: {
                files: {
                    src: ['src/**/*.js']
                }
            },

            test_unit: {
                files: {
                    src: ['test/**/*.spec.js']
                }
            },

            gruntfile: {
                files: {
                    src: ['Gruntfile.js']
                }
            }
        },

        sass: {
            build: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= build_dir %>/<%= component_sass_name %>.css': 'src/<%= component_sass_name %>.scss',
                    '<%= build_dir %>/<%= component_sass_name %>-default.css': 'src/<%= component_sass_name %>-default.scss'
                }
            }
        },

        copy: {
            build: {
                files: [
                    {
                        src: ['**/*.js'],
                        dest: '<%= build_dir %>/',
                        cwd: 'src',
                        expand: true
                    }
                ]
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                port: 9101,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        cssmin: {
            compile: {
                options: {
                    report: 'gzip'
                },
                files: {
                    '<%= build_dir %>/<%= component_sass_name %>.css': 'src/<%= component_sass_name %>.css',
                    '<%= build_dir %>/<%= component_sass_name %>-default.css': 'src/<%= component_sass_name %>-default.css'
                }
            }
        },

        ngmin: {
            compile: {
                files: [
                    {
                        src: ['**/*.js'],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            }
        },

        concat: {
            compile_js: {
                src: [
                    'component.prefix',
                    'src/sofa.js',
                    'src/**/*.js',
                    '<%= html2js.src.dest %>',
                    'component.suffix'
                ],
                dest: '<%= build_dir %>/<%= component_name %>.js'
            },
        },

        uglify: {
            compile: {
                files: {
                    '<%= build_dir %>/<%= component_name %>.min.js': '<%= concat.compile_js.dest %>'
                }
            },
        },

        changelog: {
            options: {
                dest: 'CHANGELOG.md'
            }
        },

        delta: {

            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            jssrc: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['jshint:src', 'karma:unit:run', 'ngmin', 'concat:compile_js', 'uglify:compile']
            },

            tpls: {
                files: [
                    '<%= html2js.src.src %>'
                ],
                tasks: ['html2js', 'concat:compile_js', 'uglify:compile']
            },

            jsunit: {
                files: [
                    'test/**/*.spec.js'
                ],
                tasks: ['jshint:test_unit', 'karma:unit:run']
            }
        }
    });

    grunt.registerTask('default', 'build');
    grunt.renameTask('watch', 'delta');

    grunt.registerTask('watch', [
        'build',
        'karma:unit',
        'delta'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'karma:continuous'
    ]);

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'sass',
        'karma:continuous',
        'cssmin:compile',
        'ngmin',
        'concat:compile_js',
        'uglify:compile'
    ]);
};
