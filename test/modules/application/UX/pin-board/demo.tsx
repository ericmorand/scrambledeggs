import * as React from "react";
import {render} from "../../../../index";
import {PinBoardTest} from "./index";
import {createTask, taskWithLongMessage, taskWithLongTitle} from "../../Model/task/mocks";

import type {TaskInterface} from "../../../src/modules/_/Model/task";

const tasks: Array<TaskInterface> = [
    createTask(),
    taskWithLongMessage,
    taskWithLongTitle,
    createTask(),
    createTask(),
    createTask(),
    createTask(),
    createTask(),
    createTask(),
];

render('PinBoard Demo', [{
    title: 'Default',
    content: <PinBoardTest tasks={tasks}/>
}]);




