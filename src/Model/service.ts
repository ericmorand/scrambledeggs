import {Entity, EntityInterface} from "./entity";

import type {EntityProperties} from "./entity";

export interface ServiceInterface extends EntityInterface {
    label: string;
}

export type ServiceProperties = EntityProperties & {
    label: string;
};

export class Service extends Entity<ServiceProperties> implements ServiceInterface {
    get label(): string {
        return this._properties.label;
    }
}