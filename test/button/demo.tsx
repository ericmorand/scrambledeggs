import * as React from "react";
import {render} from "../index";
import {ButtonTest} from "./index";

render('Button Demo', [{
    title: 'Default',
    content: <ButtonTest label="Click me"/>
}, {
    title: 'With a very long label',
    content: <ButtonTest
        label="This is a very very very very very very very very very very very very very very very very very very very very very very very label"/>
}]);




