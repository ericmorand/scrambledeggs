import * as React from "react";
import {render} from "../../../index";
import {TaskAsListItemTest} from "./index";
import testCases from "../cases";

render('Task As List Item Demo', testCases.map((testCase) => {
    return {
        title: testCase.title,
        content: <TaskAsListItemTest task={testCase.task}/>
    }
}));