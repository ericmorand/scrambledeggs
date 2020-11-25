import * as React from "react";

import type {FunctionComponent} from "react";

import {Joe, JoeProperties} from "../../src/joe";

export const JoeTest: FunctionComponent<JoeProperties> = ({content}) => {
    return <Joe content={content}/>;
};