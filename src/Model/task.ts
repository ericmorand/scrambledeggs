import {Entity, EntityInterface} from "./entity";
import {ApplicationInterface} from "./application";

import type {EntityProperties} from "./entity";

export interface TaskInterface extends EntityInterface {
    creationDate: Date;
    title: string;
    message: string;
    dueDate?: Date;
    completionDate?: Date;
    application?: ApplicationInterface;
}

export type TaskProperties = EntityProperties & {
    title: string;
    message: string;
    creationDate: Date;
    completionDate?: Date;
    application?: ApplicationInterface;
};

export class Task extends Entity<TaskProperties> implements TaskInterface {
    get creationDate() {
        return this._properties.creationDate;
    }

    get completionDate() {
        return this._properties.completionDate;
    }

    get application() {
        return this._properties.application;
    }

    get title() {
        return this._properties.title;
    }

    get message() {
        return this._properties.message;
    }
}