/*
 * grunt-tex-glossaries
 * https://github.com/grunt-tex/grunt-tex-glossaries
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

var when = require("when");
var lift = require("when/node").lift;
var exec = require("child_process").exec;
var _    = require("lodash-node");
var path = require("path");

module.exports = function(grunt) {

  grunt.registerMultiTask("glossaries", "Grunt glossaries task", function () {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      executable: "makeglossaries"
    });

    // Collate arguments for glossaries
    var defaultArgs = {
      "-q": null
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

    // Iterate over all specified files, executing glossaries on them
    var promises = this.filesSrc.map(function (file) {
      var opts = {
        cwd: path.dirname(file)
      };
      var fileName = path.basename(file);
      return when.promise(function (resolve, reject) {
        exec([].concat([], args, [fileName]).join(" "), opts, function (err, stdout, stderr) {
          if (err) {
            reject({
              file: file,
              msg: stderr
            });
          } else {
            resolve(file);
          }
        });
      });
    });

    // When all files have been processed, indicate task has finished
    when.all(promises)
      .catch(function (err) {
        grunt.log.error(err.msg);
        grunt.fail.fatal("Unable to generate glossary for " + err.file);
      })
      .spread(function (file) {
        grunt.log.ok("Generated glossary for " + file);
        done();
      });

  });

};