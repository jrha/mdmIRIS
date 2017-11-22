mdmIRIS
========
A familiar theme for MDM's webkit greeter based on [MDModern by Philipp Miller](https://github.com/philer/mdmodern).

![screenshot](https://raw.githubusercontent.com/jrha/mdmIRIS/master/screenshot.jpg)

## Installation
To use this theme as is, copy the files to a new directory in `/usr/share/mdm/html-themes/`. If you have git, simply type `$ sudo git clone https://github.com/jrha/mdmIRIS.git /usr/share/mdm/html-themes/` in a terminal to copy the files directly from github.

If you plan to edit the theme it may be useful to clone to somewhere else and then create a softlink via `ln -s`. In that case you'll have to make sure, that all files and directories can be read by MDM (set permissions to 777 for directories and 666 for files).

## Modifying and creating your own theme

If you want to edit the JavaScript and CSS source you'll need NPM,
[Grunt](http://gruntjs.com/) and [LESS](http://lesscss.org/) installed. You may need to run `$ npm install` to get all the node modules used by Grunt.

The source files for the theme are located in the `less/` directory. In the `js/` directory you'll find multiple JavaScript modules that allow easy modification and extension. Check DOCUMENTATION.md for information about what modules are available.

Running `$ grunt` or `$ grunt watch` will build a development version with debugging log activated. When you're done editing, run `$grunt dist` to generate a production version without debugging. Don't forget to add new files to Gruntfile.js so they will be included in your builds.

## Contributing

Suggestions, bug reports and pull requests are very welcome.
