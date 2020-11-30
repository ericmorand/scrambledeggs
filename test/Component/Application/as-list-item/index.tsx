import * as React from "react";
import {ApplicationAsListItem} from "../../../../src/Component/Application/as-list-item";

import type {FunctionComponent} from "react";
import type {ApplicationProperties} from "../../../../src/Component/Application";

export const ApplicationAsListItemTest: FunctionComponent<ApplicationProperties> = ({application}) => {
    return <ApplicationAsListItem application={application}/>;
};