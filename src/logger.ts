import winston, { Logger } from 'winston';

const loggers = new Map<string, Logger>();

export const getLogger = (label: string, level: string = 'INFO'): Logger => {
    if (!loggers.has(label)) {
        loggers.set(
            label,
            winston.createLogger({
                level: level.toLowerCase(),
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.label({ label }),
                    winston.format.errors(),
                    winston.format.splat(),
                    winston.format.json(),
                ),
                transports: [new winston.transports.Console()],
            }),
        );
    }

    // @ts-ignore
    return loggers.get(label);
};
