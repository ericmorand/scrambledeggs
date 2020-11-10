import * as React from "react";
import {render} from "../index";
import {ViewportTest} from "./index";

const viewports: Array<string> = ['small', 'medium', 'large'];

render('Viewport Demo', viewports.map((viewport) => {
    return {
        title: viewport.toUpperCase(),
        content: <ViewportTest viewport={viewport}/>
    };
}));