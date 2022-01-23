# grunt-tex-glossaries [![Build Status](https://travis-ci.org/grunt-tex/grunt-tex-glossaries.svg?branch=master)](https://travis-ci.org/grunt-tex/grunt-tex-glossaries)

Part of the [grunt-tex](https://github.com/grunt-tex) suite of LaTeX-orientated Grunt tasks.

This plugin can be used to generate glossary files for the LaTeX package `glossaries` using the perl application `makeglossaries`.

## Getting Started
This plugin requires Grunt `~0.4.5` and makeglossaries to be available.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tex-glossaries --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tex-glossaries');
```

## The "glossaries" task

### Overview
In your project's Gruntfile, add a section named `glossaries` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  glossaries: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### options.executable
Type: `String`
Default value: `makeglossaries`

If makeglossaries is not available on the command line as `makeglossaries`, put it's location in this option.

#### options.args
Type: `Object`
Default value: `{ -q: null }`

An object of arguments to pass through to glossaries as command line options. Run `makeglossaries -h` for all options. A few rules are applied to these arguments:

* If the value of a key is `null`, it will be treated a flag, i.e. it will be compiled as `--option` rather than `--option=null`
* If the key starts with `-` and has a value, ` ` will be used to separate the key and value
* If the key starts with `--` and has a value, `=` will be used to separate the key and value

Without changing any arguments, glossaries will be executed like so:

`glossaries -q <document-name>`

### Usage Examples

#### Basic
This is the most basic usage of glossaries:

```js
grunt.initConfig({
  glossaries: "document.glo"
});
```

#### Multitask
In this example, glossaries is used as a multitask, with a custom path to makeglossaries supplied

```js
grunt.initConfig({
  glossaries: {
    options: {
      executable: "/usr/bin/makeglossaries"
    },
    documentone: "documentone.glo",
    documenttwo: "documenttwo.glo"
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-01-08   v0.1.0   Initial release
* 2015-01-09   v0.2.0   Change argument handling