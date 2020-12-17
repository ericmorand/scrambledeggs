import * as React from "react";
import {Component, ReactElement} from "react";

export type ListProperties = {
    items: Array<ReactElement>
};

export class List extends Component<ListProperties> {
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
}