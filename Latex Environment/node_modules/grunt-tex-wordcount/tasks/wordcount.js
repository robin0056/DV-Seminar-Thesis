/*
 * grunt-tex-wordcount
 * https://github.com/grunt-tex/grunt-tex-wordcount
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

var when = require("when");
var lift = require("when/node").lift;
var exec = lift(require("exec"));
var _    = require("lodash-node");
var path = require("path");

module.exports = function(grunt) {

  grunt.registerMultiTask("wordcount", "Grunt wordcount task", function () {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    // Iterate over all specified files, executing wordcount on them
    var promises = this.filesSrc.map(function (file) {
      var opts = {
        cwd: path.dirname(file)
      };
      var fileName = path.basename(file);
      var cmd = "detex " + fileName + " | wc -w";
      return exec(cmd, opts)
        .spread(function (out, code) {
          // Return results as an object
          return {
            file: file,
            out: out,
            code: code
          };
        });
    });

    // When all files have been processed, indicate task has finished
    when.all(promises).then(function (results) {
      results.forEach(processResult);
      done();
    });

  });

  function processResult(result) {
    grunt.log.ok("Wordcount for " + result.file + ": " + result.out.trim());
  }

};