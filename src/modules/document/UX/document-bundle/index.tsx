import * as React from "react";
import {Component, ReactElement} from "react";

import type {DocumentInterface} from "../../Model/document";
import {DocumentAsListItem} from "../document/as-list-item";
import {List} from "../../../../application/UX/list";

// todo: should be using DocumentBundleInterface
export type DocumentBundleProperties = {
    documents: Array<DocumentInterface>,
    label: string
};

export class DocumentBundle extends Component<DocumentBundleProperties> {
    render() {
        const documents: Array<ReactElement> = [];

        for (let document of this.props.documents) {
            documents.push(<div className="document-item">
                <DocumentAsListItem document={document}/>
            </div>);
        }

        return <div className="document-bundle">
            <details>
                <summary className="header">
                    <div>
                        <div className="label">
                            {this.props.label}
                        </div>
                        <div className="count">
                            {this.props.documents.length}
                        </div>
                    </div>
                </summary>
                <List items={documents}/>
            </details>
        </div>;
    }
}