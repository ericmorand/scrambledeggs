import * as React from "react";

import type {FunctionComponent} from "react";

import {DocumentBundle, DocumentBundleProperties} from "../../../src/modules/document/UX/document-bundle";

export const DocumentBundleTest: FunctionComponent<DocumentBundleProperties> = ({documents, label}) => {
    return <DocumentBundle documents={documents} label={label}/>;
};