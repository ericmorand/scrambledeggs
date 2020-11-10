import * as React from "react";
import {render} from "../index";
import {JoeTest} from "./index";

render('joe Demo', [{
    title: 'Default',
    content: <JoeTest content="Default test content"/>
}]);