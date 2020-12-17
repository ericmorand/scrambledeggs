import {DepartmentInterface} from "../../../application/Model/department";
import {EntityInterface} from "../../../application/Model/entity";
import {UserInterface} from "../../../application/Model/user";
import {TaskInterface} from "./task";

import type {DocumentInterface} from "../../document/Model/document";

export const DRAFT_STATUS = Symbol('draft');
export const PENDING_STATUS = Symbol('pending');
export const ONGOING_STATUS = Symbol('ongoing');
export const DONE_STATUS = Symbol('done');

export type Status = typeof DRAFT_STATUS | typeof PENDING_STATUS | typeof ONGOING_STATUS | typeof DONE_STATUS;

export interface ApplicationInterface extends EntityInterface {
    department: DepartmentInterface;
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
//
// export type ApplicationProperties = EntityProperties & {
//     department: DepartmentInterface;
//     user: UserInterface;
//     creationDate: Date;
//     depositDate?: Date;
//     treatmentDate?: Date;
//     completionDate?: Date;
//     tasks: Array<TaskInterface>;
//     documents: Array<DocumentInterface>;
// };
//
// export class Application extends Entity<ApplicationProperties> implements ApplicationInterface {
//     get department() {
//         return this._properties.department;
//     }
//
//     get user() {
//         return this._properties.user;
//     }
//
//     get tasks() {
//         return this._properties.tasks;
//     }
//
//     get creationDate() {
//         return this._properties.creationDate;
//     }
//
//     get depositDate() {
//         return this._properties.depositDate;
//     }
//
//     get treatmentDate() {
//         return this._properties.treatmentDate;
//     }
//
//     get completionDate() {
//         return this._properties.completionDate;
//     }
//
//     get documents() {
//         return this._properties.documents;
//     }
//
//     /**
//      * Per specification, the status of an application is computed from the application dates.
//      * @see specification #1234, section 15
//      */
//     get status() {
//         let status: Status;
//
//         if (this.depositDate == undefined) {
//             status = DRAFT_STATUS;
//         }
//         else if (this.treatmentDate === undefined) {
//             status = PENDING_STATUS;
//         }
//         else if (this.completionDate === undefined) {
//             status = ONGOING_STATUS;
//         }
//         else {
//             status = DONE_STATUS;
//         }
//
//         return status;
//     }
//
//     get subStatus() {
//         let status: string;
//
//         if (this.status === ONGOING_STATUS) {
//             const pendingTasks = this.tasks.filter((task) => {
//                 return task.completionDate === undefined;
//             }).sort((a, b) => {
//                 return a.creationDate < b.creationDate ? -1 : 1;
//             });
//
//             const pendingTask = pendingTasks.shift();
//
//             if (pendingTask) {
//                 status = pendingTask.message;
//             }
//         }
//
//         return status;
//     }
// }