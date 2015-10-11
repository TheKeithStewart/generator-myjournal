'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the unreal ' + chalk.red('MyJournal') + ' generator!'
            ));

        var prompts = [{
            type: 'text',
            name: 'rootName',
            message: 'What would you like to call your root directory?',
            default: 'journal'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        dir: function () {
            if (!this.fs.exists(this.props.rootName)) {
                this.mkdir(this.props.rootName);
            }
        }
    }
});
