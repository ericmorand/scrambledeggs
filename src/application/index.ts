import modules from "../modules";
import {createElement, FunctionComponent, ReactElement} from "react";
import {on, redirect, register, start} from "../lib/Router";
import {render} from "react-dom";
import {Page} from "./UX/page";
import {NotFound} from "./UX/not-found";
import {PageWithNavigation} from "./UX/page/with-navigation";
import {Dashboard} from "./UX/dashboard";
import {MyDashboard} from "./UX/navigation/my-dashboard";
import {Login} from "./UX/user/login";
import {MyProfile} from "./UX/navigation/my-profile";
import {NavigationRouteItem} from "./UX/navigation/route-item";

export interface ModuleInterface {
    navigationItems: Promise<Array<ReactElement>>
}

export const getUserToken = (): string | undefined => {
    return localStorage.getItem('token');
};

export const setUserToken = (value: string | null): void => {
    if (value === null) {
        localStorage.removeItem('token');
    }
    else {
        localStorage.setItem('token', value);
    }
};

const listeners: Array<() => void> = [];

export const ready = (listener: () => void) => {
    listeners.push(listener);
};

const navigationProvider = (): Promise<Array<ReactElement>> => {
    const promises: Array<Promise<Array<ReactElement>>> = [
        Promise.resolve([
            createElement(MyDashboard),
            createElement(MyProfile)
        ])
    ];

    console.log('MMM', modules);

    for (let module of modules) {
        promises.push(module.navigationItems);
    }

    let results: Array<ReactElement> = [];

    return Promise.all(promises).then((itemsArrays) => {
        for (let itemsArray of itemsArrays) {
            results = results.concat(itemsArray);
        }

        return results;
    });
};

type ApplicationProperties = {
    content?: ReactElement
};

const index: FunctionComponent<ApplicationProperties> = ({content}) => {
    return content || createElement('div', [], [
        createElement('span', {}, 'Loading...')
    ]);
}

export const setTitle = (value: string) => {
    document.title = value;
};

export const setContent = (content: ReactElement) => {
    injectApplication({
        content
    });
};

export let navigationItems: Array<ReactElement>;

const injectApplication = (properties: ApplicationProperties = {}) => {
    render(index(properties), document.getElementById('application'));
}

export const notFoundHandler = () => {
    setTitle('Not Found');

    setContent(new Page({
        content: new NotFound({}).render()
    }).render());
};

export const homeRoute = register('/', [], () => {
    setTitle('My Dashboard');

    setContent(new PageWithNavigation({
        content: new Dashboard({
            // todo: get the token from the identity provider
            token: '123456'
        }).render()
    }).render());
});

export const loginRoute = register('login', ['id', 'foo'], ({id, foo}, state: {
    callback?: () => void
}) => {
    console.log('loginRoute EXECUTOR', id.replace('5', '5'), foo, state);

    if (getUserToken()) {
        return redirect(homeRoute, {}, {});
    }

    setTitle('User login');

    let callback = state.callback;

    if (!callback) {
        callback = () => {
            redirect(homeRoute, {}, {});
        };
    }

    setContent(new Login({
        callback
    }).render());
});

export const logoutRoute = register('logout', [], ({}, state: {
    a: number
}) => {
    setUserToken(null);

    redirect(homeRoute, {}, {});
});

export const userProfileRoute = register('profile', [], ({}) => {
    setTitle('My Profile');

    setContent(new PageWithNavigation({
        content: null
    }).render());
});

on((route) => {
    if (!route) {
        notFoundHandler();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM READY', navigationProvider());

    navigationProvider().then((items) => {
        navigationItems = items;

        console.log('ITEMS', items);

        start();
        injectApplication();

        for (let listener of listeners) {
            listener();
        }
    });
});