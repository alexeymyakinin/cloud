export declare interface IUserService<T> {
    createUser(): Promise<T | null>;

    updateUser(): Promise<T | null>;

    removeUser(): Promise<T | null>;

    selectUser(): Promise<T | null>;
}

export class UserService implements IUserService<object> {
    async createUser(): Promise<object | null> {
        return Promise.resolve(null);
    }

    async removeUser(): Promise<object | null> {
        return Promise.resolve(null);
    }

    async selectUser(): Promise<object | null> {
        return Promise.resolve(null);
    }

    async updateUser(): Promise<object | null> {
        return Promise.resolve(null);
    }
}
