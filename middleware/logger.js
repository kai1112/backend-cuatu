const  winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs =  require('fs');
const path = require('path');

let dir = "logs";
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir);
}

// const logLevel = environment === 'development' ? 'debug' : 'warn';

const dailyRotateFile = new DailyRotateFile({
    // level: logLevel,
    // @ts-ignore
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
        winston.format.errors({stack: true}),
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({level, message, timestamp, stack}) => {
            // console.log(stack)
            if (stack) {
                // print log trace
                return `${timestamp} ${level}: ${message} - ${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
        }),
    ),
});
const logger  = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            // level: logLevel,
            // format: format.simple(),
            format: winston.format.combine(
                winston.format.errors({stack: true}),
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.printf(({level, message, timestamp, stack}) => {
                    // console.log(stack)
                    if (stack) {
                        // print log trace
                        return `[${timestamp}] ${level}: ${message} - ${stack}`;
                    }
                    return `[${timestamp}] ${level}: ${message}`;
                }),
            ),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false, // do not exit on handled exceptions
});


module.exports =  logger