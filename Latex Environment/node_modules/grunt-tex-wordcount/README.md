# grunt-tex-wordcount

Part of the [grunt-tex](https://github.com/grunt-tex) suite of LaTeX-orientated Grunt tasks.

This plugin can be used to calculate the word count of a LaTeX document and all it's inclusions using the applications `detex` and `wc`.

## Getting Started
This plugin requires Grunt `~0.4.5` and `detex` + `wc` to be available.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tex-wordcount --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tex-wordcount');
```

## The "wordcount" task

### Overview
In your project's Gruntfile, add a section named `wordcount` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wordcount: {
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

There are no options available for this task.

### Usage Examples

#### Basic
This is the most basic usage of wordcount:

```js
grunt.initConfig({
  wordcount: "document.tex"
});
```

#### Multitask
In this example, wordcount is used as a multitask with different notation for each document.

```js
grunt.initConfig({
  wordcount: {
    documentone: {
      files: [
        { src: "documentone.tex" }
      ]
    },
    documenttwo: "documenttwo.tex"
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-01-08   v0.1.0   Initial release