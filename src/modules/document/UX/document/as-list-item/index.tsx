import * as React from "react";
import {Component} from "react";
import {DocumentProperties} from "../index";

export type DocumentState = {};

export class DocumentAsListItem extends Component<DocumentProperties, DocumentState> {
    render() {
        const document = this.props.document;

        return <div className="document" data-view-mode="list-item" data-type={document.type}>
            <div className="inner">
                <div className="content">
                    <div className="primary-information">
                        <span className="title" title={document.title}>{document.title}</span>
                    </div>
                    <div className="secondary-information">
                        <span className="category">{document.category}</span>
                        <span className="reference">{document.reference}</span>
                        <span className="date">{document.date.toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="action">
                    <a href={document.url.toString()} target="_self">
                        <span>🖹</span>
                    </a>
                </div>
            </div>
        </div>;
    }
}