import { NextFunction, Request, Response, Router } from 'express';

export default interface Controller {
    build(basePath: string): Router;
}

export function partial(obj: object, func: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        func(obj, req, res);
        next();
    };
}
