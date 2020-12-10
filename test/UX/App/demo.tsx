import {setContent, ready} from "../../../src/Application";
import {pdfDocument} from "../../Model/document/mocks";

import * as React from "react";
import {dashboardRoute, loginRoute} from "../../../src/RouteProvider";
import {PageWithNavigationTest} from "../Page/with-navigation";
import {DocumentBundle} from "../../../src/UX/DocumentBundle";
import {createHref, createUrl, dispatch, getLocation} from "../../../src/Router";

dashboardRoute.id;
loginRoute.id;

ready(() => {
    setTimeout(() => {
        dispatch(getLocation());
    }, 100);
});