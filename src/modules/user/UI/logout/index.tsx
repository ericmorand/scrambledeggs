import * as React from "react";
import {createHref} from "../../../../application/router";
import {homeRoute} from "../../../../application";
import {createURL} from "routee";

import type {FunctionComponent} from "react";

export const Logout: FunctionComponent = () => {
    return <div className="logout">
        <div>
            <h1>You have been successfully logged out.</h1>
        </div>
        <a href={createHref(createURL(homeRoute, {}))}>Back to home</a>
    </div>;
};