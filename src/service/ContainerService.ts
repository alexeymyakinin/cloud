import Docker from "dockerode";

import { Container } from "../models/container";
import { AbstractService } from "./AbstractService";

export class ContainerService extends AbstractService<typeof Container> {
    private docker = new Docker();

    async createContainer(options?: object) {
        throw new Error();
    }

    async listContainers(options?: object) {
        return await this.docker.listContainers(options).then((res) => {
            this.log.info("List containers", { res });
            return res;
        });
    }
}