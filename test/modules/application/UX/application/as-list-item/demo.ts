import {render} from "../../../../../demo";
import {ApplicationAsListItemTest} from "./index";
import testCases from "../cases";
import {createElement} from "react";

render('Application As List Item Demo', testCases.map(({title, application}) => {
    return {
        title,
        content: createElement(ApplicationAsListItemTest, {
            application
        })
    }
}));