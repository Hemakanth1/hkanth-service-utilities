import fs from "fs";
import { inspect } from "util";
import winston from "winston";
import DailyRotate from "winston-daily-rotate-file";

import settings from "./settings";

const { createLogger, format, transports } = winston;
const { loggingLevel } = settings.app;
const logDir = "log";

let infoLogger;
let errorLogger;
let warnLogger;
let debugLogger;
let allLogger;

class Logger {
  constructor() {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    infoLogger = createLogger({
      // change level if in dev environment versus production
      level: loggingLevel,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
        // this is to log in json format
        // format.json()
      ),
      transports: [
        new transports.Console({
          levels: "info",
          format: format.combine(
            format.colorize(),
            format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
          ),
        }),

        new DailyRotate({
          filename: `${logDir}/%DATE%-info-results.log`,
          zippedArchive: true,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });

    errorLogger = createLogger({
      level: loggingLevel,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (error) => `${error.timestamp} ${error.level}: ${error.message}`
        )
      ),
      transports: [
        new transports.Console({
          levels: "error",
          format: format.combine(
            format.colorize(),
            format.printf(
              (error) => `${error.timestamp} ${error.level}: ${error.message}`
            )
          ),
        }),

        new DailyRotate({
          filename: `${logDir}/%DATE%-errors-results.log`,
          zippedArchive: true,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });

    warnLogger = createLogger({
      level: loggingLevel,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (warn) => `${warn.timestamp} ${warn.level}: ${warn.message}`
        )
      ),
      transports: [
        new transports.Console({
          levels: "warn",
          format: format.combine(
            format.colorize(),
            format.printf(
              (warn) => `${warn.timestamp} ${warn.level}: ${warn.message}`
            )
          ),
        }),

        new DailyRotate({
          filename: `${logDir}/%DATE%-warnings-results.log`,
          zippedArchive: true,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });

    debugLogger = createLogger({
      level: loggingLevel,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (debug) => `${debug.timestamp} ${debug.level}: ${debug.message}`
        )
      ),
      transports: [
        new transports.Console({
          levels: "debug",
          format: format.combine(
            format.colorize(),
            format.printf(
              (debug) => `${debug.timestamp} ${debug.level}: ${debug.message}`
            )
          ),
        }),

        new DailyRotate({
          filename: `${logDir}/%DATE%-debugs-results.log`,
          zippedArchive: true,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });

    allLogger = createLogger({
      level: loggingLevel,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
          (silly) => `${silly.timestamp} ${silly.level}: ${silly.message}`
        )
      ),
      transports: [
        new DailyRotate({
          filename: `${logDir}/%DATE%-results.log`,
          zippedArchive: true,
          datePattern: "YYYY-MM-DD",
        }),
      ],
      exitOnError: false,
    });
  }

  log(severity, message, data) {
    let logMessage;

    if (data && typeof data === "object") {
      logMessage = message.concat("\n").concat(inspect(data));
    } else {
      logMessage = message;
    }

    if (severity == null || infoLogger.levels[severity] == null) {
      this.severity = "info";
    }

    if (severity === "info") {
      infoLogger.log(severity, logMessage);
      allLogger.log(severity, logMessage);
    } else if (severity === "error") {
      errorLogger.log(severity, logMessage);
      allLogger.log(severity, message);
    } else if (severity === "warn") {
      warnLogger.log(severity, logMessage);
      allLogger.log(severity, logMessage);
    } else if (severity === "debug") {
      debugLogger.log(severity, logMessage);
    }
  }
}

const logger = new Logger();

export default logger;
