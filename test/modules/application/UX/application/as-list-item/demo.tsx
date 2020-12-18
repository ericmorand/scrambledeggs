import * as React from "react";
import {render} from "../../../../../index";
import {ApplicationAsListItemTest} from "./index";
import testCases from "../cases";

render('Application As List Item Demo', testCases.map((testCase) => {
    return {
        title: testCase.title,
        content: <ApplicationAsListItemTest application={testCase.application}/>
    }
}));