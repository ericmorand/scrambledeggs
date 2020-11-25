import {Entity, EntityInterface, EntityProperties} from "./entity";

export interface DocumentInterface extends EntityInterface {
    title: string;
    date: Date;
    url: URL;
    type: 'pdf' | 'jpg';
}

export type DocumentProperties = EntityProperties & {
    title: string;
    date: Date;
    url: URL;
    type: 'pdf' | 'jpg';
};

export class Document extends Entity<DocumentProperties> implements DocumentInterface {
    get title() {
        return this._properties.title;
    }

    get date() {
        return this._properties.date;
    }

    get url() {
        return this._properties.url;
    }

    get type() {
        return this._properties.type;
    }
}
