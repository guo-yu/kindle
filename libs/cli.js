'use strict';

const fs = require('fsplus');
const path = require('path');
const utils = require('./utils');
const kindle = require('./kindle');

const minimist = require('minimist');
const ansi = require('ansi')

const Print = require('../view/Print')
const LoadingText = require('../view/LoadingText')

let cursor = ansi(process.stdout)
let print = new Print(cursor)

let configFile = path.resolve(__dirname, '../config.json');
let configs = fs.readJSON(configFile);

module.exports = function() {

  let argv = minimist(process.argv.slice(2))
  let argument = argv._;

  //config
  if(argument[0] === 'config') {

    //Set the kindle address
    if (argv.kindle && argv.kindle.mail) {

      if (utils.checkEmail(argv.kindle.mail)) {

        fs.updateJSON(configFile, {
          kindleMail: argv.kindle.mail
        });

        print.insertField('Kindle\'s address was successfully save it', argv.kindle.mail)

      } else {
        print.error('Failed to save kindle address', 'Invalid email address')
        process.exit(1)
      }
    }

    //Set the user mail
    if (argv.user && argv.user.mail) {

      if (utils.checkEmail(argv.user.mail)) {
        fs.updateJSON(configFile, {
          userMail: argv.user.mail
        });
        print.insertField('User address was successfully save it', argv.user.mail)
      } else {
        print.error('Failed to save user address', 'Invalid email address')
        process.exit(1)
      }
    }

    //Set the user password
    if(argv.user && argv.user.password) {
      fs.updateJSON(configFile, {
        userPassword: argv.user.password
      });
      print.insertField('User password was successfully save it')
    }

    process.exit(0)
  }

  if(argument[0] === 'send') {
    print.log('Loading config file...')

    if(!configs.kindleMail) {
      print.error('Failed to load kindle address', 'Email address not found')
      print.warning('Set the kindle address by running the command', 'kindle config --kindle.mail example@kindle.com')
      process.exit(0)
    }

    if(!configs.userMail) {
      print.error('Failed to load user address', 'Email address not found')
      print.warning('Set the user address by running the command', 'kindle config --user.mail user@mail.com')
      process.exit(0)
    }

    if(!configs.userPassword) {
      print.error('Failed to load user password', 'User password not found')
      print.warning('Set the user password by running the command', 'kindle config --user.password password')
      process.exit(0)
    }

    print.successLog('The config settings were successfully loaded.')

    if(argument.length === 1) {
      print.error('Fatal error', 'There is no files to be sent')
      process.exit(0)
    }

    let loadingText = new LoadingText(cursor, 'Sending files', 'The files were successfully sent')
    let files = argument.slice(1)

    loadingText.init()

    kindle.push({
      to: configs.kindleMail,
      from: configs.userMail,

      sender: {
        email: configs.userMail,
        password: configs.userPassword
      },

      files: files
    })
    .then(data => {
      loadingText.successEnd('The files has been successfully sent')
      console.log(data)
      process.exit(0)
    })
    .catch(err => {
      loadingText.errorEnd('Fatal error while sending the files')
      //TODO Find a better way to output that error
      console.log(err)
      process.exit(0)
    })
  }
}
