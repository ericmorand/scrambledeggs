import * as React from "react";

import type {FunctionComponent} from "react";

import {List, ListProperties} from "../../../../src/application/UX/list";

export const ListTest: FunctionComponent<ListProperties> = ({items}) => {
    return <List items={items}/>;
};