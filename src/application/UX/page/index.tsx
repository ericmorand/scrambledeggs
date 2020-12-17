import {Component, ReactElement} from "react";
import * as React from "react";

export type PageProperties = {
    content: ReactElement
};

export class Page<T extends PageProperties = PageProperties> extends Component<T> {
    render() {
        return <div className="page">
            <div className="content">
                {this.props.content}
            </div>
        </div>
    }
}