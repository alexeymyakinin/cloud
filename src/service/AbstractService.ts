import { FindOptions, ModelStatic } from "sequelize/types/model";
import { Logger } from "winston";
import { getLogger } from "../logger";
import { Optional } from "sequelize";

export class AbstractService<T extends ModelStatic<any>> {
    protected log: Logger;

    constructor(protected model: T) {
        this.log = getLogger(this.constructor.name);
    }

    async retrieve(id: number): Promise<T> {
        return await this.model.findByPk(id);
    }

    async select(options: FindOptions): Promise<T[]> {
        return await this.model.findAll(options);
    }

    async create(data: Optional<never, string>): Promise<T> {
        return await this.model.create(data);
    }

    async update(id: number, data: never): Promise<any> {
        return await this.model.update(data, {
            where: { id: id },
            returning: true,
        });
    }

    async delete(id: number): Promise<number> {
        return await this.model.destroy({ where: { id: id } });
    }
}
