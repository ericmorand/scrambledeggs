import {EntityInterface} from "../../../application/Model/entity";

export interface UserInterface extends EntityInterface {
    firstName: string;
    lastName: string;
    fullName: string;
}
