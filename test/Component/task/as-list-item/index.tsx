import * as React from "react";
import {TaskAsListItem} from "../../../../src/Component/Task/as-list-item";

import type {FunctionComponent} from "react";
import type {TaskProperties} from "../../../../src/Component/Task";

export const TaskAsListItemTest: FunctionComponent<TaskProperties> = ({task}) => {
    return <TaskAsListItem task={task}/>;
};