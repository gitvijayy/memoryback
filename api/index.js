/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const queryLogger = require('knex-logger');
const general = require('./helpers');
const logger = require('../config/winston');
const db = require('../config/db');

const passport = require('../config/passport');
const { catchErrors, throwError } = require('../config/error-middleware');

const validFileTypes = ['js'];
const invalidFiles = ['helpers.js', 'queries.js'];
const invalidDirectory = ['helpers', 'notificationTypes', 'scrap'];
// const invalidDirectory=['intervals']
let consoleFolder = 0;

const requireFiles = (directory, routeHandlers) => {
  fs.readdirSync(directory).forEach((fileName) => {
    const file = `${directory}/${fileName}`;
    // Recurse if directory
    if (fs.lstatSync(file).isDirectory()) {
      consoleFolder = 0;
      requireFiles(file, routeHandlers);
    } else {
      const directoryName = directory.split('/').pop();
      // Skip this file
      if (fileName === 'index.js' && directory === __dirname) return;
      // skip invalid directory
      if (invalidDirectory.indexOf(directoryName) !== -1) return;
      // Skip unknown filetypes
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;
      // Skip invalid files
      if (invalidFiles.indexOf(fileName) !== -1) return;

      // eslint-disable-next-line no-console
      // console the required dir
      if (!consoleFolder) {
        console.log('____________________________');
        console.log('DIR =>', directoryName);
        consoleFolder = 1;
      }

      // Require the file.
      try {
        require(file).routes(routeHandlers);
      } catch (err) {
        console.log('#######NO EXPORT ROUTE###########');
      }
      // console the required file
      console.log('FILE =>', fileName);
    }
  });
};

module.exports = (app) => {
  if (process.env.ENV !== 'production') {
    app.use(queryLogger(db));
  }

  const routeHandlers = {
    app,
    db,
    catchErrors,
    throwError,
    general,
    logger,
    passport,
  };
  requireFiles(__dirname, routeHandlers);
};
