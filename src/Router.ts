import {createHashHistory, Location} from "history";

type SanitizeRouteParameters<T> = T extends Record<infer K, any> ? ([K] extends [never] ? Record<string, never> : Record<K, string>) : T;
type RouteParameters<T extends Array<string>> = SanitizeRouteParameters<Record<T[number], string>>;
type Keys<O> = Array<keyof O & string>;

export type RouteInterface<Parameters extends Array<string>, State extends Record<string, any> = undefined> = {
    id: string;
    segments: Parameters;
};

export type RouteExecutor<P, S> = (parameters: P, state: S) => void;

const history = createHashHistory();
const registeredRoutes: Map<string, RouteExecutor<any, any>> = new Map();

export const register = <P, S>(
    id: string,
    segments: Keys<P> | Array<undefined>,
    executor: RouteExecutor<P, S>
): RouteInterface<Keys<P>, S> => {
    const route = {
        id,
        segments
    };

    registeredRoutes.set(getRoutePattern(route), executor);

    return route;
};

export const redirect = <P extends Array<string>, S>(route: RouteInterface<P, S>, parameters: RouteParameters<P>, state?: S): void => {
    forward(route, parameters, state);

    history.replace(createUrl(route, parameters));
};

export const forward = <P extends Array<string>, S>(route: RouteInterface<P, S>, parameters: RouteParameters<P>, state?: S): void => {
    const key = getRoutePattern(route);

    if (registeredRoutes.has(key)) {
        const executor = registeredRoutes.get(key);

        executor(parameters, state);
    }
};

const getRoutePattern = <P extends Array<string>>(route: RouteInterface<P>): string => {
    let pattern: string = route.id;

    const segments = route.segments;

    if (segments.length > 0) {
        pattern += '/';

        pattern += (`(${[...segments].sort((a, b) => {
            return a < b ? -1 : 1;
        }).map((segment) => {
            return segment ? `(${segment}/.*)` : '';
        }).join('/')})`);
    }

    return pattern;
};

export const getLocation = (): Location => {
    return history.location;
};

export const createUrl = <P extends Array<string>>(route: RouteInterface<P>, parameters: RouteParameters<P>): string => {
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

export const createHref = <P extends Array<string>>(route: RouteInterface<P>, parameters: RouteParameters<P>): string => {
    return history.createHref(createUrl(route, parameters));
};

export const dispatch = <S extends object>(location: Location<S>) => {
    console.log('> MATCH', location.pathname);

    for (const [pattern, executor] of registeredRoutes) {
        console.log(pattern, location.pathname);
        const regExp = new RegExp(pattern);

        if (regExp.test(location.pathname)) {

            const matches = regExp.exec(location.pathname);
            const parameters: Record<string, string> = {};

            matches.splice(0, 2);

            console.log(matches);

            for (let match of matches) {
                const [key, value] = match.split('/');

                parameters[key] = value;
            }

            executor(parameters, {});
        }
    }
};

history.listen(({action, location}) => {
    dispatch(location);
});
