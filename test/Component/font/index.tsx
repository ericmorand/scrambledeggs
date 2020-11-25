import * as React from "react";

import type {FunctionComponent} from "react";

import {Font, FontProperties} from "../../src/font";

export const FontTest: FunctionComponent<FontProperties> = ({content}) => {
    return <Font content={content}/>;
};