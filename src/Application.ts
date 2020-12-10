import {createElement, FunctionComponent} from "react";
import {render} from "react-dom";

import type {ReactElement} from "react";

type ApplicationProperties = {
    content?: ReactElement
};

const application: FunctionComponent<ApplicationProperties> = ({content}) => {
    return content || createElement('div', [], [
        createElement('span', {}, 'Loading...')
    ]);
}

const listeners: Array<() => void> = [];

export const ready = (listener: () => void) => {
    listeners.push(listener);
};

export const setContent = (content: ReactElement) => {
    injectApplication({
        content
    });
};

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

const injectApplication = (properties: ApplicationProperties = {}) => {
    render(application(properties), document.getElementById('application'));
}

document.addEventListener('DOMContentLoaded', () => {
    injectApplication();

    for (let listener of listeners) {
        listener();
    }
});
