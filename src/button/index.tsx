import {Component} from "react";
import * as React from "react";

export type ButtonProperties = {
    label: string,
    type?: 'button' | 'submit'
};

export class Button extends Component<ButtonProperties> {
    render() {
        return <button type={this.props.type || "button"} className="🔳">
            <span>🔳 {this.props.label}</span>
        </button>
    }
}