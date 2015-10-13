'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.argument('journalName', {
            required: false,
            type: String,
            desc: 'The name of the journal series'
        });

        if (!this.journalName) {
            this.journalName = "myjournal";
        }

        this.log("You are creating a journal file for the '" + this.journalName + "' journal series.");
    },

    writing: function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var fileName = 'date' + year + '-' + month + '-' + day + '.md';
        var path = this.journalName + '/entries/';

        if (this.fs.exists(path + fileName)) {
            this.log('The journal file your are requesting already exists.');
        } else {
            this.fs.copyTpl(
                this.templatePath('_journal.md'),
                this.destinationPath(path + fileName),
                { date: year + '-' + month + '-' + day, journalName: this.journalName }
            );
        }
    }
});
