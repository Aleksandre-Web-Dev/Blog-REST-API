const loggerConfig = require("../configurations/loggerConfig.json");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: loggerConfig.timeFormat }), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: loggerConfig.logFilename }),
  ],
});

module.exports = logger;
