'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.argument('seriesName', {
            required: false,
            type: String,
            desc: 'The name of the journal series'
        });
        this.argument('subSeriesName', {
            required: false,
            type: String,
            desc: 'The name of the sub series'
        });

        if (!this.seriesName) {
            this.seriesName = "myjournal";
        }

        this.log("You are creating a journal file for the '" + this.seriesName + "' journal series.");
    },

    writing: function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        month = pad(month, 2);
        var day = today.getDate();
        day = pad(day, 2);
        var fileName = (this.subSeriesName ? this.subSeriesName + "_" : "") + year + '-' + month + '-' + day + '.md';
        var path = this.seriesName + '/';

        if (this.fs.exists(path + fileName)) {
            this.log('The journal file you are requesting already exists.');
        } else {
            this.fs.copyTpl(
                this.templatePath('_journal.md'),
                this.destinationPath(path + fileName),
                {
                    date: year + '-' + month + '-' + day
                }
            );
        }
    }
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}