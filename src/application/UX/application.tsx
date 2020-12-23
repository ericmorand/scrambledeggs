import {FunctionComponent, ReactElement} from "react";
import {Splash} from "./splash";

export type ApplicationProperties = {
    content?: ReactElement
};

export const Application: FunctionComponent<ApplicationProperties> = ({content}) => {
    return content || Splash();
};

Application.displayName = 'Application';