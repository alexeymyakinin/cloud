import { AbstractService } from "./AbstractService";
import { Container } from "../models/container";
import { Docker } from "node-docker-api";

export class ContainerService extends AbstractService<typeof Container> {
    private docker: Docker = new Docker({});

    async createContainer(options?: object) {
        return await this.docker.container.create(options).then((res) => {
            this.log.info("Create container", { res });
            return res;
        });
    }

    async listContainers(options?: object) {
        return await this.docker.container.list(options).then((res) => {
            this.log.info("List containers", { res });
            return res;
        });
    }
}
