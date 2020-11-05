import {Component} from "react";

import * as React from "react";

import {Button, ButtonProperties} from "../../src/button";

export class ButtonTest extends Component<ButtonProperties> {
    render() {
        return <Button label={this.props.label}/>;
    }
}

