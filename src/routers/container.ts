import { Context } from "koa";
import Router from "koa-router";

import { Container } from "../models/container";
import { ContainerService } from "../service/ContainerService";

const containerService = new ContainerService(Container);
const listContainers = async (ctx: Context) => {
    await containerService.listContainers({}).then((res) => {
        ctx.body = res;
        ctx.status = 200;
    });
};

export const containerRouter = new Router().get(
    "/api/container",
    listContainers,
);