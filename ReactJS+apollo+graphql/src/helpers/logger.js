import BrowserConsole from "winston-transport-browserconsole";

const winston = require("winston");

const IS_DEV = process.env.NODE_ENV !== "production";
const logger = winston.createLogger({
    level: IS_DEV ? "debug" : "info",
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        //  new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //new winston.transports.File({ filename: 'combined.log' })
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
//if (process.env.NODE_ENV !== "production") {
logger.add(
    new BrowserConsole({
        format: winston.format.simple(),
        prettyPrint: true,
        colorize: true,
        level: "debug",
    })
);
//}
export { logger };
