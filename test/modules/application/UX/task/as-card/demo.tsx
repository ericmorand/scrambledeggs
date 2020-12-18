import * as React from "react";
import {render} from "../../../../../index";
import {TaskAsCardTest} from "./index";
import testCases from "../cases";

import type {TaskInterface, TaskProperties} from "../../../../src/modules/_/Model/task";

const createFakeTask = (properties: Partial<TaskProperties> = {}): TaskInterface => {
    return {
        title: properties.title || 'Task title',
        message: properties.message || 'Hell is not the outer mineral of the source. Per guest prepare a dozen and a half teaspoons of sour milk with squeezed chicken lard for dessert. ',
        identifier: `${Math.random()}`,
        creationDate: new Date(),
        completionDate: undefined,
        application: undefined
    }
};

render('Task As Card Demo', testCases.map((testCase) => {
    return {
        title: testCase.title,
        content: <TaskAsCardTest task={testCase.task}/>
    }
}));