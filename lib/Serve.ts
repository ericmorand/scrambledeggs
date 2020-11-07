import {StateInterface, StateWorkerFactory} from "./State";
import {
    create as createBrowserSync,
    has as hasBrowserSync,
    get as getBrowserSync,
    Options as BrowserSyncOptions
} from "browser-sync";
import {Component} from "./Component";
import {join as joinPath} from "path";

type ServeFactoryParameters = {
    component: Component,
    entry: string
};

export const serveFactory: StateWorkerFactory<ServeFactoryParameters> = ({component, entry}) => {
    return (state) => {
        return new Promise<StateInterface>((resolve) => {
            let browserSync = hasBrowserSync(component.name) ? getBrowserSync(component.name) : null;

            if (!browserSync) {
                browserSync = createBrowserSync(component.name);

                let browserSyncConfig: BrowserSyncOptions = {
                    server: joinPath('www', component.name),
                    ui: false,
                    open: false,
                    notify: false
                };

                browserSync.init(browserSyncConfig, () => {
                    resolve(state);
                });
            } else {
                browserSync.reload(entry);

                resolve(state);
            }
        });
    };
};

export const reloadFactory: StateWorkerFactory<ServeFactoryParameters> = ({component, entry}) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            let browserSync = hasBrowserSync(component.name) ? getBrowserSync(component.name) : null;

            if (browserSync) {
                browserSync.reload(entry);
            }

            return state;
        });
    };
};