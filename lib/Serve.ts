import {bold, grey, rainbow} from "colors/safe";
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
                    notify: false,
                    logLevel: 'silent'
                };

                browserSync.init(browserSyncConfig, (error, browserSync) => {
                    const title: string = '🍳 Your eggs are served';
                    const localURL: string = browserSync.getOption('urls').get('local');
                    const name: string = component.name;
                    const message: string = name + ': ' + localURL;
                    const length: number = message.length + 2;
                    const idealPadding: number = (length - title.length) / 2;
                    const leftPadding: number = Math.floor(idealPadding);
                    const rightPadding: number = leftPadding + (idealPadding > leftPadding ? 1 : 0);

                    console.log(grey('╔' + '═'.repeat(length) + '╗'));
                    console.log(grey('║') + ' '.repeat(leftPadding) + bold(title) + ' '.repeat(rightPadding) + grey('║'));
                    console.log(grey('╠' + '═'.repeat(length) + '╣'));
                    console.log(grey('║ ') + rainbow(message) + grey(' ║'));
                    console.log(grey('╚' + '═'.repeat(length) + '╝'));

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