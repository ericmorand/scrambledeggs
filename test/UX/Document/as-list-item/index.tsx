import * as React from "react";

import type {FunctionComponent} from "react";

import {DocumentAsListItem, DocumentProperties} from "../../../../src/UX/Document/as-list-item";

export const DocumentTest: FunctionComponent<DocumentProperties> = ({document}) => {
    return <DocumentAsListItem document={document}/>;
};