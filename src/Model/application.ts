import {ServiceInterface} from "./service";
import {Entity, EntityInterface} from "./entity";
import {UserInterface} from "./user";
import {TaskInterface} from "./task";

import type {EntityProperties} from "./entity";
import {DocumentInterface} from "./document";

type Status = 'draft' | 'pending' | 'ongoing' | 'done';

export interface ApplicationInterface extends EntityInterface {
    service: ServiceInterface;
    user: UserInterface;
    tasks: Array<TaskInterface>;
    creationDate: Date;
    depositDate: Date | undefined;
    treatmentDate: Date | undefined;
    completionDate: Date | undefined;
    documents: Array<DocumentInterface>;
    status: Status;
    subStatus: string | undefined;
}

export type ApplicationProperties = EntityProperties & {
    service: ServiceInterface;
    user: UserInterface;
    creationDate: Date;
    depositDate?: Date;
    treatmentDate?: Date;
    completionDate?: Date;
    tasks: Array<TaskInterface>;
    documents: Array<DocumentInterface>;
};

export class Application extends Entity<ApplicationProperties> implements ApplicationInterface {
    get service() {
        return this._properties.service;
    }

    get user() {
        return this._properties.user;
    }

    get tasks() {
        return this._properties.tasks;
    }

    get creationDate() {
        return this._properties.creationDate;
    }

    get depositDate() {
        return this._properties.depositDate;
    }

    get treatmentDate() {
        return this._properties.treatmentDate;
    }

    get completionDate() {
        return this._properties.completionDate;
    }

    get documents() {
        return this._properties.documents;
    }

    /**
     * Per specification, the status of an application is computed from the application dates.
     * @see specification #1234, section 15
     */
    get status() {
        let status: Status;

        if (this.depositDate == undefined) {
            status = 'draft';
        }
        else if (this.treatmentDate === undefined) {
            status = 'pending';
        }
        else if (this.completionDate === undefined) {
            status = 'ongoing';
        }
        else {
            status = 'done';
        }

        return status;
    }

    get subStatus() {
        let status: string;

        if (this.status === 'ongoing') {
            const pendingTasks = this.tasks.filter((task) => {
                return task.completionDate === undefined;
            }).sort((a, b) => {
                return a.creationDate < b.creationDate ? -1 : 1;
            });

            const pendingTask = pendingTasks.shift();

            if (pendingTask) {
                status = pendingTask.message;
            }
        }

        return status;
    }
}