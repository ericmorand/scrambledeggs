import * as React from "react";
import {Component, ReactElement} from "react";

import type {DocumentInterface} from "../../Model/document";
import {DocumentAsListItem} from "../Document/as-list-item";

// todo: should be using DocumentBundleInterface
export type DocumentBundleProperties = {
    documents: Array<DocumentInterface>,
    label: string
};

export class DocumentBundle extends Component<DocumentBundleProperties> {
    render() {
        const documents: Array<ReactElement> = [];

        for (let document of this.props.documents) {
            documents.push(<div className="item">
                <DocumentAsListItem document={document}/>
            </div>);
        }

        return <div className="document-bundle">
            <div className="header">
                <div className="title">
                    {this.props.label}
                </div>
            </div>
            <div className="items">
                {documents}
            </div>
        </div>;
    }
}