import express, { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import UserService from '../service/UserService';

const listUsers = async (
    request: Request,
    response: Response,
    _: NextFunction,
) => {
    await UserService.select({});
    await User.findAll()
        .then((res) => response.status(200).send(res))
        .catch((error) => response.status(500).send(error));
};

const fetchUser = async (
    request: Request,
    response: Response,
    _: NextFunction,
) => {
    const id = request.params.userId;
    await User.findByPk(id)
        .then((res) => response.status(200).send(res))
        .catch((error) => response.status(500).send(error));
};

const createUser = async (
    request: Request,
    response: Response,
    _: NextFunction,
) => {
    await User.create(request.body)
        .then((res) => res.get())
        .then((res) => response.status(201).send(res))
        .catch((err) => response.status(500).send(err));
};

const updateUser = async (
    request: Request,
    response: Response,
    _: NextFunction,
) => {
    response.status(200).send();
};

const userRouter = express
    .Router()
    .use(express.json())
    .get('/api/user/:userId', fetchUser)
    .get('/api/user', listUsers)
    .post('/api/user', createUser)
    .patch('/api/user', updateUser);

export default userRouter;
