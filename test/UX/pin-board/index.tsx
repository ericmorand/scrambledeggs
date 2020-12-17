import {Component} from "react";
import * as React from "react";
import {PinBoard} from "../../../src/modules/application/UX/PinBoard";

import type {PinBoardProperties} from "../../../src/modules/application/UX/PinBoard";

export class PinBoardTest extends Component<PinBoardProperties> {
    render() {
        return <PinBoard tasks={this.props.tasks}/>;
    }
}

