import {Component} from "react";
import * as React from "react";

export type JoeProperties = {
    content: string
};

export type JoeState = {
    foo: string
};

export class Joe extends Component<JoeProperties, JoeState> {
    constructor(properties: JoeProperties) {
        super(properties);

        this.state = {
            foo: 'state.foo'
        }
    }

    render() {
        return <div className="joe">
            {this.props.content}
            {this.state.foo}
        </div>;
    }
}