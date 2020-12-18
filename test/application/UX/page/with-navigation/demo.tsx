import * as React from "react";
import {render} from "../../../../index";
import {PageWithNavigationTest} from "./index";
import testCases from "../cases";

render('Page With Navigation Demo', testCases.map((testCase) => {
    return {
        title: testCase.title,
        content: <PageWithNavigationTest/>
    }
}));