import * as React from "react";
import {Component, createElement} from "react";

import type {FunctionComponent, ReactElement} from "react";

export type ListProperties = {
    items: Array<ReactElement>
};

export const List: FunctionComponent<ListProperties> = (properties) => createElement(class extends Component<ListProperties> {
    render() {
        const items: Array<ReactElement> = [];

        for (let item of this.props.items) {
            items.push(<div className="item">
                {item}
            </div>);
        }

        return <div className="items">
            {items}
        </div>;
    }
}, properties);