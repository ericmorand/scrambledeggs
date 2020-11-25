import * as React from "react";

import type {FunctionComponent} from "react";

import {Document, DocumentProperties} from "../../../src/Component/document";

export const DocumentTest: FunctionComponent<DocumentProperties> = ({document}) => {
    return <Document document={document}/>;
};