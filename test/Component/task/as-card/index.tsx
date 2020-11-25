import * as React from "react";
import {TaskAsCard} from "../../../../src/Component/Task/as-card";

import type {FunctionComponent} from "react";
import type {TaskProperties} from "../../../../src/Component/Task";

export const TaskAsCardTest: FunctionComponent<TaskProperties> = ({task}) => {
    return <TaskAsCard task={task}/>;
};