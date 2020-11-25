export interface EntityInterface {
    identifier: string;
}

export type EntityProperties = {
  identifier: string;
};

export abstract class Entity<P extends EntityProperties> implements EntityInterface {
    protected _properties: P;

    constructor(properties: P) {
        this._properties = properties;
    }

    get identifier(): string {
        return this._properties.identifier;
    }
}