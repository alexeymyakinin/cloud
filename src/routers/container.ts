import express, { Request, Response } from "express";
import { ContainerService } from "../service/ContainerService";
import { Container } from "../models/container";

const containerService = new ContainerService(Container);
const listContainers = async (request: Request, response: Response) => {
    await containerService
        .listContainers({})
        .then((res) => response.status(200).send(res));
};

export const containerRouter = express
    .Router()
    .get("/api/container", listContainers);
