/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'app/*.js', 'app/javascript/backbone/**/*.js']
    },
    snockets: {
      dev: {
        src: 'app/javascript/all.js',
        dest: 'bin/content/js/all.js',
        combine: true,
        minify: false
      }
    },
    dust: {
      dev: {
        src: 'app/templates',
        dest: 'app/templates/templates.combined.js'
      }
    },
   watch: {
      files: ['app/templates/**/*.html', 'app/javascript/*.js', 'app/javascript/**/*.js'],
      tasks: 'dust lint snockets'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        indent: 2,
        onevar: true,
        smarttabs: false,
        white: false
        //white: true //jslint whitespace rules
      },
      globals: {    // define allowed globals, otherwise these will generate warnings which clutter
        console: true,
        jQuery: true,
        Backbone: true,
        '_': true,
        dust: true,
        Modernizr: true,
        google: true
      }
    }
  });

  // Load local tasks from /tasks folder
  grunt.loadTasks("tasks");

  // Default task.
  grunt.registerTask('default', 'dust lint snockets');



};
