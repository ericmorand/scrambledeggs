import {EntityInterface} from "../../../application/Model/entity";

export interface DocumentInterface extends EntityInterface {
    title: string;
    date: Date;
    url: URL;
    type: 'pdf' | 'jpg';
    reference: string;
    category: string;
}
