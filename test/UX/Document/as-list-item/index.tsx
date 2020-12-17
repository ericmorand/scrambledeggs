import * as React from "react";

import type {FunctionComponent} from "react";

import {DocumentAsListItem} from "../../../../src/modules/document/UX/document/as-list-item";
import {DocumentProperties} from "../../../../src/modules/document/UX/document";

export const DocumentAsListItemTest: FunctionComponent<DocumentProperties> = ({document}) => {
    return <DocumentAsListItem document={document}/>;
};