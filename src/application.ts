import { randomUUID } from "crypto";
import Koa, { Context, Next } from "koa";

import { SERVICE_HOST, SERVICE_PORT } from "./config";
import { sequelize } from "./database";
import { getLogger } from "./logger";
import { containerRouter } from "./routers/container";
import userRouter from "./routers/user";

const logger = getLogger("application");
const loggerMiddleware = async (ctx: Context, next: Next) => {
    const requestId = randomUUID();
    const { ip, url, query, headers } = ctx;

    logger.info("Request accepted", { ip, url, query, headers, requestId });
    await next();
    logger.info("Response sent", { requestId });
};

const startApp = async (): Promise<Koa> => {
    const app = new Koa();
    app.use(loggerMiddleware);
    app.use(userRouter.routes());
    app.use(containerRouter.routes());

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