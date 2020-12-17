import {EntityInterface} from "./entity";

export interface UserInterface extends EntityInterface {
    firstName: string;
    lastName: string;
    fullName: string;
}
