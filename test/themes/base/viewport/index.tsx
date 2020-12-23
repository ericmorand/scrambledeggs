import * as React from "react";

import type {FunctionComponent} from "react";

type ViewportTestProperties = {
    viewport: string
};

export const ViewportTest: FunctionComponent<ViewportTestProperties> = ({viewport}) => {
    return <div className="viewport-test" data-viewport={viewport}/>;
};