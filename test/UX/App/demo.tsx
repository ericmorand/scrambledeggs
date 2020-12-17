import * as React from "react";
import {dispatch, getLocation} from "../../../src/lib/Router";
import {ready} from "../../../src/application";

ready(() => {
    setTimeout(() => {
        dispatch(getLocation());
    }, 100);
});