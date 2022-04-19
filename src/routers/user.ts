import { Context } from "koa";
import koaBody from "koa-body";
import Router from "koa-router";

import { User } from "../models/user";
import { UserService } from "../service/UserService";

const userService = new UserService(User);
const listUsers = async (ctx: Context) => {
    await userService.select({});
    await User.findAll()
        .then((res) => {
            ctx.body = res;
            ctx.status = 200;
        })
        .catch((err) => {
            ctx.body = err;
            ctx.status = 500;
        });
};

const fetchUser = async (ctx: Context) => {
    const id = Number(ctx.query.id);
    await userService
        .retrieve(id)
        .then((res) => {
            ctx.body = res;
            ctx.status = 200;
        })
        .catch((err) => {
            ctx.body = err;
            ctx.status = 500;
        });
};

const createUser = async (ctx: Context) => {
    await userService
        .create(ctx.request.body)
        .then((res) => {
            ctx.body = res;
            ctx.status = 200;
        })
        .catch((err) => {
            ctx.body = err;
            ctx.status = 500;
        });
};

const updateUser = async (ctx: Context) => {
    await userService
        .update(Number(ctx.query.id), ctx.request.body)
        .then((res) => {
            ctx.body = res;
            ctx.status = 200;
        })
        .catch((err) => {
            ctx.body = err;
            ctx.status = 500;
        });
};

const userRouter = new Router()
    .use(koaBody())
    .get("/api/user/:id", fetchUser)
    .get("/api/user", listUsers)
    .post("/api/user", createUser)
    .patch("/api/user", updateUser);

export default userRouter;