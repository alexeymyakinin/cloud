import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "./routers/user";
import { sequelize } from "./database";
import { getLogger } from "./logger";
import { SERVICE_HOST, SERVICE_PORT } from "./config";
import { containerRouter } from "./routers/container";
import { randomUUID } from "crypto";

const logger = getLogger("application");
const loggerMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const meta = {
        path: req.path,
        headers: req.headers,
        requestId: randomUUID(),
    };
    logger.info("Request", meta);
    next();
    logger.info("Error", { error });
};
const startApp = async (): Promise<Application> => {
    const app = express();
    app.use(loggerMiddleware);
    app.use(userRouter);
    app.use(containerRouter);

    sequelize
        .authenticate()
        .then(() => logger.info("Sequelize connected successfully"))
        .catch((err) => logger.error(err));

    return app;
};

startApp().then((app) =>
    app.listen(SERVICE_PORT, SERVICE_HOST, () =>
        logger.info("Server started successfully"),
    ),
);
