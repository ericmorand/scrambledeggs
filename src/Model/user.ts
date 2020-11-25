import {Entity, EntityInterface, EntityProperties} from "./entity";

export interface UserInterface extends EntityInterface {
    firstName: string;
    lastName: string;
    fullName: string;
}

export type UserProperties = EntityProperties & {
  firstName: string;
  lastName: string;
};

export class User extends Entity<UserProperties> implements UserInterface {
    get firstName(): string {
        return this._properties.firstName;
    }

    get lastName(): string {
        return this._properties.lastName;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}