import { FindOptions, ModelStatic } from 'sequelize/types/model';

export class AbstractService<T extends ModelStatic<any>> {
    constructor(protected model: T) {}

    async retrieve(id: number): Promise<T> {
        return await this.model.findByPk(id);
    }

    async select(options: FindOptions): Promise<T[]> {
        return await this.model.findAll(options);
    }

    async create(data: any): Promise<T> {
        return await this.model.create(data);
    }

    async update(id: number, data: any): Promise<any> {
        return await this.model.update(data, {
            where: { id: id },
            returning: true,
        });
    }

    async delete(id: number): Promise<number> {
        return await this.model.destroy({ where: { id: id } });
    }
}
