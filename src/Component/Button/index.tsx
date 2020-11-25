import {Component} from "react";
import * as React from "react";

export type ButtonProperties = {
    label: string,
    type?: 'button' | 'submit',
    action: () => void
};

export class Button extends Component<ButtonProperties> {
    render() {
        return <button type={this.props.type || "button"} className="🔳" onClick={this.props.action}>
            <span>{this.props.label}</span>
        </button>
    }
}