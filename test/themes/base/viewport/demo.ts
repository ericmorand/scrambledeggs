import {render} from "../../../demo";
import {ViewportTest} from "./index";
import {createElement} from "react";

const viewports: Array<string> = ['small', 'medium', 'large'];

render('Viewport Demo', viewports.map((viewport) => {
    return {
        title: viewport.toUpperCase(),
        content: createElement(ViewportTest, {
            viewport
        })
    };
}));