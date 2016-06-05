module.exports = function (grunt) {
  'use strict';

  // # time-grunt
  // Times how long tasks take. Handy for identifying bottlenecks.
  require('time-grunt')(grunt)

  // # jit-grunt
  // Load grunt plugins without using a .loadNpmTasks block at the end of the Gruntfile.
  require('jit-grunt')(grunt)
  
  
  grunt.initConfig({
    
    /*                 */
    /*      TASKS      */
    /*                 */


    // # watch
    // Watch for changes in the specified files and run the
    // associated tasks.
    watch: {
      options: {
        forever: false
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['styles/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
//      js: {
//        files: ['scripts/{,*/}*.js'],
//        tasks: ['jshint']
//      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'index.html',
          'styles/{,*/}*.css',
          'scripts/{,*/}*.js'
        ]
      }
    },

    connect: {
      options: {
        port: 1107,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {

      }
    },
    
    // # jshint
    // Ensure js is up-to-snuff. (Does not do heavy
    // validation, just coding style and basic syntax.)
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        asi: true,
        laxbreak: true
      },
      all: ['scripts/{,*/}*.js']
    },
    
    // # sass
    // Compiles Sass to CSS.
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles/sass',
          src: ['{,*/}*.{scss,sass}'],
          dest: 'styles',
          ext: '.css'
        }]
      }
    }
  })
  
  // # grunt validate
  // Validate project files, checking for syntax errors, and running our test suite.
  grunt.registerTask('validate', [
    //'jshint'
  ])

  // # grunt compile
  // Compile the project. Generate CSS and HTML from Sass and Handlebars.
  grunt.registerTask('compile', [
    'sass'
  ])

  // # grunt enhance
  // Improve upon the compiled project. Minify files, cache bust.
  grunt.registerTask('enhance', [
    
  ])

  // # grunt build
  // Build the project. Don't serve it. Crafted from scratch.
  grunt.registerTask('build', [
    'validate',
    'compile',
    'enhance'
  ])

  // # grunt (default)
  // Build the project. (Same as `grunt serve`.)
  grunt.registerTask('default', [ 'serve' ])

  // # grunt serve
  // Build, watch, and livereload on an express server.
  grunt.registerTask('serve', [
    'build',
    'connect:livereload',
    'watch'
  ])
  
  grunt.registerTask('deploy', [
    'validate',
    'compile',
    'enhance'
  ])
  
}