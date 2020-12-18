import * as React from "react";
import {ApplicationAsListItem} from "../../../../../../src/modules/application/UX/Application/as-list-item";

import type {FunctionComponent} from "react";
import type {ApplicationProperties} from "../../../../../../src/modules/application/UX/Application";

export const ApplicationAsListItemTest: FunctionComponent<ApplicationProperties> = ({application}) => {
    return <ApplicationAsListItem application={application}/>;
};