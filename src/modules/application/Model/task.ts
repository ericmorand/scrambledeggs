import {EntityInterface} from "../../../application/Model/entity";
import {ApplicationInterface} from "./application";

export interface TaskInterface extends EntityInterface {
    creationDate: Date;
    title: string;
    message: string;
    dueDate?: Date;
    completionDate?: Date;
    application?: ApplicationInterface;
}
