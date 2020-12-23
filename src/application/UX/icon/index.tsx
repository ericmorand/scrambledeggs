import * as React from "react";

import {FunctionComponent} from "react";

export const Icon: FunctionComponent<{
    name: string
}> = ({name}) => <div className={'icon'}>{name}</div>;

Icon.displayName = 'Icon';