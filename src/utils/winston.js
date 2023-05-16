import winston from 'winston';
import obj from '../config.js';

const logLevels = {
    names: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'black',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

let logger

if(obj.node_env === 'development') {
    logger = winston.createLogger({
        levels: logLevels.names,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({colors:logLevels.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
} else {
    logger = winston.createLogger({
        levels: logLevels.names,
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './errors.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                    winston.format.label({label: 'Log in file errors.'})
                )
            })
        ]
    })
}

export default logger;