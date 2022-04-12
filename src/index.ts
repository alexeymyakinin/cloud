import express, { Application } from 'express';
import { UserService } from './service/UserService';
import UserController from './controller/UserController';

function createApp(): Application {
    const app: Application = express();
    // const container = new DependencyContainer();
    // container.addSingleton('IUserService', UserService);
    // container.addScoped('UserController', UserController);

    const userService = new UserService();
    const userController = new UserController(userService);
    app.use('/api/user/', userController.build());

    return app;
}

createApp().listen(8000, '127.0.0.1', (...args) => console.log(...args));
