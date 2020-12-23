import {Component, createElement, FunctionComponent, ReactElement} from "react";
import * as React from "react";

export type PageProperties = {
    title: string,
    content: ReactElement
};

export const Page: FunctionComponent<PageProperties> = (properties) => createElement(class extends Component<PageProperties> {
    render() {
        const titleParts = this.props.title.split(' ');
        const titleElements: Array<ReactElement> = [];

        for (let part of titleParts) {
            titleElements.push(<span>{part}</span>);
        }

        return <div className="page">
            <h1>{titleElements}</h1>
            <div className="content">
                {this.props.content}
            </div>
        </div>
    }
}, properties);

Page.displayName = 'Page';
