import {DepartmentInterface} from "./department";
import {EntityInterface} from "./entity";

export interface CategoryInterface extends EntityInterface {
    label: string;
    department: DepartmentInterface;
    parent?: CategoryInterface;
}
