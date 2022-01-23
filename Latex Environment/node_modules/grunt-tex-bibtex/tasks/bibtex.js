/*
 * grunt-tex-bibtex
 * https://github.com/grunt-tex/grunt-tex-bibtex
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

  grunt.registerMultiTask("bibtex", "Grunt bibtex task", function () {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      executable: "bibtex"
    });

    // Collate arguments for bibtex
    var defaultArgs = {
      "-terse": null
    };
    var argsObj = _.extend(defaultArgs, options.args);
    var args = [options.executable];
    _.each(argsObj, function (value, key) {
      if (value !== null) {
        if (key.substr(0, 2) === "--") {
          args.push(key + "=" + value);
        } else {
          args.push(key);
          args.push(value);
        }
      } else {
        args.push(key);
      }
    });

    // Iterate over all specified files, executing bibtex on them
    var promises = this.filesSrc.map(function (file) {
      var opts = {
        cwd: path.dirname(file)
      };
      var fileName = path.basename(file);
      return exec([].concat([], args, [fileName]), opts)
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
    _.each(result.out.split("\n"), function (line) {

      // Check for errors
      if (line.indexOf("I couldn't") !== -1) {
        grunt.log.error(line);
        grunt.fail.fatal("Unable to generate bibliography for " + result.file);
      }

      //Check for warnings
      var warning = line.match(/^Warning--(.+)$/);
      if (warning) {
        grunt.log.warn(warning[1]);
      }

    });
    grunt.log.ok("Generated bibliography for " + result.file);
  }

};