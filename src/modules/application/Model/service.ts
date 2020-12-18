import {EntityInterface} from "../../../application/Model/entity";
import {CategoryInterface} from "../../../application/Model/category";

export interface ServiceInterface extends EntityInterface {
    label: string;
    category: CategoryInterface;
}