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
        var day = today.getDate();
        var fileName = (this.subSeriesName ? this.subSeriesName + "_" : "") + year + '-' + month + '-' + day + '.md';
        var path = this.seriesName + '/';

        if (this.fs.exists(path + fileName)) {
            this.log('The journal file you are requesting already exists.');
        } else {
            this.fs.copyTpl(
                this.templatePath('_journal.md'),
                this.destinationPath(path + fileName),
                {
                    date: year + '-' + month + '-' + day, 
                    seriesName: this.seriesName,
                    subSeriesName: this.subSeriesName
                }
            );
        }
    }
});
