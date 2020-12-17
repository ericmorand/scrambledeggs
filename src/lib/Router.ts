import {createHashHistory, Location} from "history";

type SanitizeRouteParameters<T> = T extends Record<infer K, any> ? ([K] extends [never] ? Record<string, never> : Record<K, string>) : T;
type ExecutorParameters<T extends Array<string>> = SanitizeRouteParameters<Record<T[number], string>>;
type Keys<O> = Array<keyof O & string>;

export type RouteExecutor<P extends Array<string>, S extends Record<any, any>> = (parameters: ExecutorParameters<P>, state: S) => void;

export type RouteInterface<Segments extends Array<string>, State extends Record<string, any> = undefined> = {
    id: string;
    segments: Segments;
    executor: RouteExecutor<Segments, State>;
};

const history = createHashHistory();
const registeredRoutes: Map<string, RouteInterface<Array<string>, Record<string, any>>> = new Map();

export const register = <P, S>(
    id: string,
    segments: Keys<P> | Array<undefined>,
    executor: RouteExecutor<Keys<P> | Array<undefined>, S>
): RouteInterface<Keys<P>, S> => {
    const route = {
        id,
        segments,
        executor
    };

    console.log('rEGISTER', registeredRoutes);

    registeredRoutes.set(getRoutePattern(route), route);

    return route;
};

export const redirect = <P extends Array<string>, S>(route: RouteInterface<P, S>, parameters: ExecutorParameters<P>, state: S): void => {
    forward(route, parameters, state);

    history.replace(createUrl(route, parameters));
};

export const forward = <P extends Array<string>, S>(route: RouteInterface<P, S>, parameters: ExecutorParameters<P>, state: S): void => {
    route.executor(parameters, state);
};

const getRoutePattern = <P extends Array<string>>(route: RouteInterface<P>): string => {
    let pattern: string = `^${route.id}`;

    const segments = route.segments;

    if (segments.length > 0) {
        pattern += '/';

        pattern += (`(${[...segments].sort((a, b) => {
            return a < b ? -1 : 1;
        }).map((segment) => {
            return segment ? `(${segment}/.*)` : '';
        }).join('/')})`);
    }

    pattern += '$';

    return pattern;
};

export const getLocation = (): Location => {
    return history.location;
};

export const createUrl = <P extends Array<string>>(route: RouteInterface<P>, parameters: ExecutorParameters<P>): string => {
    const parts: Array<string> = [route.id];

    if (parameters) {
        const parametersMap: Map<string, string> = new Map();

        for (let key in parameters) {
            parametersMap.set(key, parameters[key]);
        }

        const keys = [...parametersMap.keys()].sort();

        for (let key of keys) {
            parts.push(key);
            parts.push(parametersMap.get(key));
        }
    }

    return parts.join('/');
};

export const createHref = <P extends Array<string>>(route: RouteInterface<P>, parameters: ExecutorParameters<P>): string => {
    return history.createHref(createUrl(route, parameters));
};

export type DispatchListener = (route: RouteInterface<any> | undefined) => void;

const listeners: Array<DispatchListener> = [];

export const on = (listener: DispatchListener) => {
    listeners.push(listener);
};

let currentRoute: RouteInterface<any>;

export const getCurrentRoute = () => {
    return currentRoute;
};

export const dispatch = <S extends object>(location: Location<S>): RouteInterface<any> => {
    let dispatchedRoute: RouteInterface<any>;
    let pathname: string = location.pathname;

    console.log('dis', location);

    for (const [pattern, route] of registeredRoutes) {
        const regExp = new RegExp(pattern);

        if (regExp.test(pathname)) {
            dispatchedRoute = route;

            const matches = regExp.exec(pathname);
            const parameters: Record<string, string> = {};

            matches.splice(0, 2);

            for (let match of matches) {
                const [key, value] = match.split('/');

                parameters[key] = value;
            }

            route.executor(parameters, {});

            break;
        }
    }

    currentRoute = dispatchedRoute;

    for (let listener of listeners) {
        listener(dispatchedRoute);
    }

    return dispatchedRoute;
};

export const start = () => {
    history.listen(({action, location}) => {
        dispatch(location);
    });
}
