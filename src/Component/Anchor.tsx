import {FunctionComponent} from "react";
import * as React from "react";

export type AnchorProperties = {
    url: string,
    target: '_self' | '_blank',
    title: string
};

export const Anchor: FunctionComponent<AnchorProperties> = (properties) => {
    return <a href={properties.url} target={properties.target}>
        {properties.children}
    </a>;
};
