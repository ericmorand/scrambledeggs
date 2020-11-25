import * as React from "react";
import {render} from "../../index";
import {PinBoardTest} from "./index";
import {createMock, taskWithLongMessage, taskWithLongTitle} from "../task/mocks";

import type {TaskInterface} from "../../../src/Model/task";

const tasks: Array<TaskInterface> = [
    createMock(),
    taskWithLongMessage,
    taskWithLongTitle,
    createMock(),
    createMock(),
    createMock(),
    createMock(),
    createMock(),
    createMock(),
];

render('PinBoard Demo', [{
    title: 'Default',
    content: <PinBoardTest tasks={tasks}/>
}]);




