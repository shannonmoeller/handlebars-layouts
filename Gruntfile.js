/*jshint node:true */
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Scripts
         */

        // Lint scripts
        jshint: {
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'test/**/test.*.js'
            ]
        },

        // Bundle and wrap scripts
        browserify: {
            options: {
                transform: ['brfs']
            },

            build: {
                options: { standalone: '<%= pkg.name %>' },
                src: ['lib/<%= pkg.name %>.js'],
                dest: '<%= pkg.name %>.js'
            },

            test: {
                options: { debug: true },
                src: ['test/**/test.*.js'],
                dest: 'test/all.js'
            }
        },

        // Test scripts
        simplemocha: {
            options: { reporter: 'spec' },

            all: ['test/all.js']
        },

        /**
         * Development
         */

        // Delete generated files
        clean: {
            js: [
                '<%= pkg.name %>.js',
                'test/all.js'
            ],

            node: ['node_modules']
        },

        // File watching
        watch: {
            options: { livereload: true },

            js: {
                files: [
                    'lib/**/*.js',
                    'test/**/test.*.js'
                ],
                tasks: ['js']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // Tasks
    grunt.registerTask('js', ['clean:js', 'jshint', 'browserify']);
    grunt.registerTask('test', ['js', 'simplemocha']);
    grunt.registerTask('default', ['test']);
};
