import * as React from "react";
import {Component} from "react";
import {DocumentInterface} from "../../Model/document";

export type DocumentProperties = {
    document: DocumentInterface
};

export type DocumentState = {};

export class Document extends Component<DocumentProperties, DocumentState> {
    render() {
        const document = this.props.document;

        return <div className="document" data-type={document.type}>
            <div className="inner">
                <div className="title"><span>{document.title}</span></div>
                <div className="content">
                    <div className="date">{document.date.toLocaleString()}</div>
                    <div className="link">
                        <a href={document.url.toString()} target="_self">See your document</a>
                    </div>
                </div>
            </div>
        </div>;
    }
}