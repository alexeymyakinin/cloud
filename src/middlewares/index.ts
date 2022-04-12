import 'reflect-metadata';

enum DependencyScope {
    scoped,
    singleton,
}

type Dependency = {
    scope: DependencyScope;
    implementation: any;
};

class DependencyUnresolvedType extends Error {
    constructor(receivedType: any, ...args: Array<any>) {
        super(...args);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DependencyUnresolvedType);
        }
    }
}

class DependencyAlreadyExists extends Error {
    constructor(declaration: any, stored: any, ...args: Array<any>) {
        super(...args);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DependencyAlreadyExists);
        }
    }
}

class DependencyDoesntExist extends Error {
    constructor(declaration: any, ...args: Array<any>) {
        super(...args);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DependencyDoesntExist);
        }
    }
}

export class DependencyContainer {
    private readonly container: Map<string, Dependency>;
    private readonly singleton: Map<string, object>;
    private readonly scopeStrategy: Map<string, Function>;

    constructor() {
        this.container = new Map<string, Dependency>();
        this.singleton = new Map<string, object>();
        this.scopeStrategy = new Map<string, Function>();
    }

    public getDependencies(receiver: any): Array<any> {
        return Reflect.getMetadata('design:paramtypes', receiver);
    }

    public addScoped<T>(declaration: string, implementation: any): this {
        return this.setDependency(
            DependencyScope.scoped,
            declaration,
            implementation,
        );
    }

    public addSingleton(declaration: string, implementation: any): this {
        return this.setDependency(
            DependencyScope.singleton,
            declaration,
            implementation,
        );
    }

    private setDependency(
        scope: DependencyScope,
        declaration: string,
        implementation: any,
    ): this {
        if (this.container.has(declaration)) {
            throw new DependencyAlreadyExists(
                implementation,
                this.container.get(declaration),
            );
        }

        this.container.set(declaration, { scope, implementation });
        return this;
    }
}
