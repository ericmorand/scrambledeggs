import * as React from "react";
import {Component, ReactElement} from "react";

import type {TaskInterface} from "../../Model/task";
import {TaskAsCard} from "../Task/as-card";

export type PinBoardProperties = {
    tasks: Array<TaskInterface>;
};

export class PinBoard extends Component<PinBoardProperties> {
    get pins(): Array<ReactElement> {
        return this.props.tasks.map((task) => {
            return <div className="pin">
                <TaskAsCard task={task}/>
            </div>;
        });
    }

    render() {
        return <div className="pin-board">
            <div className="pins">
                {this.pins}
            </div>
        </div>;
    }
}