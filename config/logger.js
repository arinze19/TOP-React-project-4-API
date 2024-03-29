// const fs = require('fs');
const chalk = require('chalk');
const winston = require('winston');

// const logsDir = './logs';

// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir);
// }

const tsFormat = () => {
  return new Date().toLocaleDateString();
};

const customFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true,
      timestamp: tsFormat,
      json: false,
      format: customFormat,
    }),
    // new winston.transports.File({
    //   level: 'error',
    //   filename: `${logsDir}/errors.log`,
    //   timestamp: tsFormat,
    //   json: false,
    //   colorize: false,
    //   maxSize: 5242880,
    //   maxFiles: 3,
    // }),
  ],
  exitOnError: false,
});

class Logger {
  static error(err) {
    logger.level = 'error';
    logger.error(
      `${chalk.red('ERROR: ' + err.message + ', STACK TRACE: ' + err.stack)}`
    );
  }

  static warn(msg) {
    logger.level = 'warn';
    logger.warn(`${chalk.yellow(msg)}`);
  }

  static log(msg) {
    logger.level = 'info';
    logger.info(`${chalk.blue(msg)}`);
  }
}

module.exports = Logger;
