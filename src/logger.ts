import winston, { Logger } from "winston";

const memoizedLogger = () => {
    const cached = new Map();

    return (name: string): Logger => {
        if (cached.has(name)) {
            return cached.get(name);
        }

        const logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                winston.format.label({ label: name }),
                winston.format.errors(),
                winston.format.splat(),
                winston.format.json(),
            ),
            transports: [new winston.transports.Console()],
        });
        cached.set(name, logger);
        return logger;
    };
};

export const getLogger = memoizedLogger();
