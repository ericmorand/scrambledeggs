import {render} from "../../../demo";
import {FontTest} from "./index";
import {createElement} from "react";

render('font Demo', [{
    title: 'Default',
    content: createElement(FontTest, {
        content: "Default test content"
    })
}]);