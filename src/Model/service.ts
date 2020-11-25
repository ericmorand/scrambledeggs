import {Entity, EntityInterface} from "./entity";

import type {EntityProperties} from "./entity";

export interface ServiceInterface extends EntityInterface {

}

export type ServiceProperties = EntityProperties & {

};

export class Service extends Entity<ServiceProperties> implements ServiceInterface {

}