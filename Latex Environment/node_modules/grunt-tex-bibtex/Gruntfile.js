/*
 * grunt-tex-bibtex
 * https://github.com/grunt-tex/grunt-tex-bibtex
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js",
        "<%= mochaTest.test.src %>"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ["tmp"]
    },

    // Need to ensure directory is created before tests are run
    mkdir: {
      tests: {
        options: {
          create: ["tmp"]
        }
      }
    },

    // Copy fixture files into tmp directory
    copy: {
      tests: {
        files: [{ expand: true, cwd: "test/fixtures", src: ["*"], dest: "tmp" }]
      }
    },

    // Configuration to be run (and then tested).
    bibtex: {
      succeed: "tmp/succeed.aux",
      fail: "tmp/fail.aux",
      warn: "tmp/warn.aux"
    },

    // Unit tests.
    mochaTest: {
      test: {
        options: {
          reporter: "spec"
        },
        src: ["test/test.js"]
      }
    }

  });

  // Actually load this plugins task(s).
  grunt.loadTasks("tasks");

  // Load NPM tasks
  require("load-grunt-tasks")(grunt);

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["clean", "mkdir", "copy", "mochaTest"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};