'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: false,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log('You called the Myjournal subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('journal.md'),
      this.destinationPath('journal/journal.md')
    );
  }
});
