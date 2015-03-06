var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  writing: function() {
    if (arguments.length < 1) {
      throw new Error('Missing arugment. Expecting name of your app.');
    }

    this.fs.copyTpl(
      this.templatePath('./'),
      this.destinationRoot(),
      {
        appName: arguments[0]
      }
    );

    this.fs.copy(this.templatePath('.*'), this.destinationRoot());
  },
  install: function() {
    this.installDependencies();
  },
  end: function() {
    console.log('\nRock and roll!\nType gulp to start server with livereload at localhost:3000');
  }
});
