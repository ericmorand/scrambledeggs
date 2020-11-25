import {Component} from "react";

import * as React from "react";

import {Button, ButtonProperties} from "../../src/button";

type ButtonTestProperties = {
    label: string
}

export class ButtonTest extends Component<ButtonTestProperties> {
    render() {
        return <Button label={this.props.label} action={undefined}/>;
    }
}

