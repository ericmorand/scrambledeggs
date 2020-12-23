import modules from "../modules";
import {registerRoute, dispatch, createURL} from "routee";
import {render} from "react-dom";
import {Page} from "./UX/page";
import {NotFound} from "./UX/not-found";
import {PageWithNavigation} from "./UX/page/with-navigation";
import {Dashboard} from "./UX/dashboard";
import {getLocation, listen} from "./router";
import {Application, ApplicationProperties} from "./UX/application";

import type {RouteInterface} from "routee";
import type {ReactElement} from "react";
import {getUserToken} from "../modules/user";

export interface ModuleInterface {
    navigationItems: Promise<Array<NavigationItem>>
}

const listeners: Array<() => void> = [];

export const ready = (listener: () => void) => {
    listeners.push(listener);
};

type NavigationItem = {
    icon: string,
    label: string,
    url: string,
    route: RouteInterface<any>
};

export let navigationItems: Array<NavigationItem>;

const navigationProvider = (): Promise<Array<NavigationItem>> => {
    const promises: Array<Promise<Array<NavigationItem>>> = [
        Promise.resolve([{
            label: 'My Dashboard',
            route: homeRoute,
            url: createURL(homeRoute, {}),
            icon: 'dashboard'
        }])
    ];

    for (let module of modules) {
        promises.push(module.navigationItems);
    }

    let results: Array<NavigationItem> = [];

    return Promise.all(promises).then((itemsArrays) => {
        for (let itemsArray of itemsArrays) {
            results = results.concat(itemsArray);
        }

        return results;
    });
};

export const setTitle = (value: string) => {
    document.title = value;
};

export const setContent = (content: ReactElement) => {
    injectApplication({
        content
    });
};

const injectApplication = (properties: ApplicationProperties = {}) => {
    render(Application(properties), document.getElementById('application'));
}

const notFoundHandler = () => {
    setTitle('Not Found');

    setContent(
        Page({
            title: 'Page not found',
            content: NotFound({})
        })
    );
};

export const homeRoute = registerRoute('/', [], () => {
    setTitle('My Dashboard');

    getUserToken().then(() => {
        setContent(
            PageWithNavigation({
                title: 'My Applications',
                content: Dashboard({
                    // todo: get the token from the identity provider
                    token: '123456'
                })
            })
        );
    });
});

export let currentRoute: RouteInterface<any>;

const currentRouteListeners: Array<CurrentRouteListener> = [];

const setCurrentRoute = (route: RouteInterface<any> | undefined) => {
    currentRoute = route;

    for (let listener of currentRouteListeners) {
        listener(currentRoute);
    }

    if (!route) {
        notFoundHandler();
    }
}

listen((route) => {
    setCurrentRoute(route);
});

type CurrentRouteListener = (route: RouteInterface<any>) => void;

export const on = (listener: CurrentRouteListener) => {
    currentRouteListeners.push(listener);
}

document.addEventListener('DOMContentLoaded', () => {
    navigationProvider().then((items) => {
        navigationItems = items;

        injectApplication();

        setCurrentRoute(dispatch(getLocation()));

        for (let listener of listeners) {
            listener();
        }
    });
});