import {createHashHistory} from "history";
import {createURL, dispatch} from "routee";

import type {ExecutorParameters, RouteInterface} from "routee";

const history = createHashHistory();

export const redirect = <P extends Array<string>, S>(route: RouteInterface<P, S>, parameters: ExecutorParameters<P>, state: S) => {
    route.executor(parameters, state);

    history.replace(createURL(route, parameters));
};

export const getLocation = (): string => {
    return history.location.pathname;
};

export const listen = (listener: (route: RouteInterface<any> | undefined) => void): void => {
    history.listen(({location}) => {
        listener(dispatch(location.pathname));
    });
};

export const createHref = (url: string) => {
    return history.createHref(url);
};


