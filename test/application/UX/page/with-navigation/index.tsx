import * as React from "react";
import {PageWithNavigation} from "../../../../../src/application/UX/page/with-navigation";

import type {FunctionComponent} from "react";
import {PageProperties} from "../../../../../src/application/UX/page";

export const PageWithNavigationTest: FunctionComponent<PageProperties> = (properties) => {
    return <PageWithNavigation {...properties}/>;
};