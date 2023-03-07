
var appRoot = require('app-root-path');
var winston = require('winston');

const basedir =process.env.APP_BASEDIR;   

/*
const { combine, printf } = format;

const myFormat = printf( ({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
*/

// define the custom settings for each transport (file, console)
var options = {
    console: {
        level: 'debug',
        prettyPrint: true,
        handleExceptions: true,
        json: false,
        colorize: true
    },
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    } /*,
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error-app.log`,
        json: true,
        handleExceptions: true
    },*/
};

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
    
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    ),
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

module.exports =logger;