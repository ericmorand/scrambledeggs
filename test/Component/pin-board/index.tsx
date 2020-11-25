import {Component} from "react";
import * as React from "react";
import {PinBoard} from "../../../src/Component/PinBoard";

import type {PinBoardProperties} from "../../../src/Component/PinBoard";

export class PinBoardTest extends Component<PinBoardProperties> {
    render() {
        return <PinBoard tasks={this.props.tasks}/>;
    }
}

