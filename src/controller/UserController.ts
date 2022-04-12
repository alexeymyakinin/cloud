import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../types/Controller';
import { IUserService } from '../service/UserService';

export default class UserController implements Controller {
    private readonly userService: IUserService<object>;

    constructor(userService: IUserService<object>) {
        this.userService = userService;
    }

    build(): Router {
        const router = Router();
        router
            .route('/')
            .post(this.createUser)
            .get(this.fetchUser)
            .put(this.updateUser);
        return router;
    }

    async createUser(request: Request, response: Response, next: NextFunction) {
        return await Promise.resolve().then(() => {
            response.status(200).send({ message: 'Ok' });
            next();
        });
    }

    async updateUser() {}

    async removeUser() {}

    async fetchUser() {}
}
