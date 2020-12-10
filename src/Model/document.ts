import {Entity, EntityInterface, EntityProperties} from "./entity";
import {ApplicationInterface} from "./application";

export interface DocumentInterface extends EntityInterface {
    title: string;
    date: Date;
    url: URL;
    type: 'pdf' | 'jpg';
    reference: string;
    category: string;
}

export type DocumentProperties = EntityProperties & {
    title: string;
    date: Date;
    url: URL;
    type: 'pdf' | 'jpg';
    reference: string;
};

export abstract class Document<P extends DocumentProperties> extends Entity<P> implements DocumentInterface {
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

    get reference() {
        return this._properties.reference;
    }

    get category(): string {
        return undefined;
    }
}

export interface ApplicationDocumentInterface extends DocumentInterface {
    application: ApplicationInterface;
}

export type ApplicationDocumentProperties = DocumentProperties & {
    application: ApplicationInterface;
};

export class ApplicationDocument extends Document<ApplicationDocumentProperties> implements ApplicationDocumentInterface {
    get application() {
        return this._properties.application;
    }

    get category() {
        return 'CATEGORY';
    }
}
