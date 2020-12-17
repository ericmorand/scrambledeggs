import * as React from "react";
import {TaskAsListItem} from "../../../../src/modules/application/UX/Task/as-list-item";

import type {FunctionComponent} from "react";
import type {TaskProperties} from "../../../../src/modules/application/UX/Task";

export const TaskAsListItemTest: FunctionComponent<TaskProperties> = ({task}) => {
    return <TaskAsListItem task={task}/>;
};