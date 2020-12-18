import * as React from "react";
import {render} from "../../../../demo";
import {createElement} from "react";
import {ApplicationDashboardTest} from "./index";

render('Applications Dashboard Demo', [{
    title: 'Default',
    content: createElement(ApplicationDashboardTest, {
        tasks: [][Symbol.iterator]()
    })
}]);