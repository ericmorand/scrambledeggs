import * as React from "react";
import {TaskAsCard} from "../../../../../../src/modules/application/UX/Task/as-card";

import type {FunctionComponent} from "react";
import type {TaskProperties} from "../../../../../../src/modules/application/UX/Task";

export const TaskAsCardTest: FunctionComponent<TaskProperties> = ({task}) => {
    return <TaskAsCard task={task}/>;
};