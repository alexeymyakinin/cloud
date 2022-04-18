import express, { Application } from 'express';
import userRouter from './routers/user';

function createApp(): Application {
    const app: Application = express();
    app.use('/', userRouter);
    return app;
}

createApp().listen(8000, '127.0.0.1', (...args) => console.log(...args));
