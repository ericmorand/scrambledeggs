import {build as buildTypeScriptFactory} from "./lib/Typescript";
import {build as buildTwigFactory} from "./lib/Twig";
import {build as buildSassFactory} from "./lib/Sass";
import {Gaze} from "gaze";
import {join as joinPath} from "path";
import {TwingLoaderChain, TwingLoaderFilesystem, TwingLoaderRelativeFilesystem} from "twing";
import {JsxEmit, ScriptTarget} from "typescript";
import {writeFactory} from "./lib/Write";
import {Worker, WorkerFactory} from "./lib/Worker";
import {
    create as createBrowserSync,
    has as hasBrowserSync,
    get as getBrowserSync,
    Options as BrowserSyncOptions
} from "browser-sync";

import type {BuildResult} from "./lib/BuildResult";

const broaderify = require("broaderify");

// typeScript
// todo: read data from tsconfig.json
const buildTypeScript = buildTypeScriptFactory({
    compilerOptions: {
        jsx: JsxEmit.React,
        skipLibCheck: true,
        // incremental: true,
        // tsBuildInfoFile: '.tsbuildinfo',
        target: ScriptTarget.ES2015,
        sourceMap: true,
        inlineSources: true,
        noImplicitAny: true
    },
    bundlerOptions: {
        extensions: ['.tsx', '.ts'],
        debug: true
    },
    bundlerTransforms: [{
        executor: broaderify,
        options: {
            global: true,
            loaders: [{
                filter: /node_modules\/react\/index.js/,
                worker: (module, content, done) => {
                    done('module.exports = require(\'./cjs/react.production.min.js\');');
                }
            }, {
                filter: /node_modules\/react-dom\/index.js/,
                worker: (module, content, done) => {
                    done('module.exports = require(\'./cjs/react-dom.production.min.js\');');
                }
            }]
        }
    }]
})

// twig
const filesystemLoader = new TwingLoaderFilesystem('.');

filesystemLoader.addPath('lib', 'Lib');

const loader = new TwingLoaderChain([
    new TwingLoaderRelativeFilesystem(),
    filesystemLoader
]);

const buildTwig = buildTwigFactory({
    loader: loader,
    environment: {
        auto_reload: true,
        cache: 'tmp/twig'
    }
});

// sass
const buildSass = buildSassFactory({
    sourceMap: true,
    sourceMapContents: true,
    sourceMapEmbed: true,
    outFile: 'index.css'
});

class Component {
    private readonly _name: string;
    private readonly _path: string;

    constructor(name: string, path: string) {
        this._name = name;
        this._path = path;
    }

    get name(): string {
        return this._name;
    }

    get path(): string {
        return this._path;
    }
}

interface GazeEventEmitter {
    on(event: 'changed', listener: (filepath: string) => void): this;

    on(event: 'all', listener: (event: 'added' | 'changed' | 'renamed' | 'deleted', filepath: string) => void): this;
}

const watchers: Map<() => Promise<BuildResult>, Gaze> = new Map();

const watchFactory: WorkerFactory<Worker<BuildResult>, BuildResult> = (callback) => {
    return (buildResult) => {
        return Promise.resolve(buildResult).then((buildResult) => {
            return new Promise((resolve) => {
                if (watchers.has(callback)) {
                    const watcher = watchers.get(callback);

                    watcher.close();
                }

                new Gaze(buildResult.files, {}, (error, watcher) => {
                    watchers.set(callback, watcher);

                    (watcher as unknown as GazeEventEmitter).on('changed', () => {
                        callback();
                    });

                    resolve(buildResult);
                });
            });
        });
    };
};

type ServeFactoryParameters = {
    component: Component,
    entry: string
};

const serveFactory: WorkerFactory<ServeFactoryParameters, BuildResult> = ({component, entry}) => {
    return (buildResult) => {
        let browserSync = hasBrowserSync(component.name) ? getBrowserSync(component.name) : null;

        if (!browserSync) {
            browserSync = createBrowserSync(component.name);

            let browserSyncConfig: BrowserSyncOptions = {
                server: joinPath('www', component.name),
                ui: false,
                open: false,
                notify: false
            };

            return new Promise((resolve) => {
                browserSync.init(browserSyncConfig, () => {
                    resolve(buildResult);
                });
            });
        } else {
            browserSync.reload(entry);
        }
    };
};

const reloadFactory: WorkerFactory<ServeFactoryParameters, BuildResult> = ({component, entry}) => {
    return (buildResult) => {
        return Promise.resolve(buildResult).then((buildResult) => {
            let browserSync = hasBrowserSync(component.name) ? getBrowserSync(component.name) : null;

            if (browserSync) {
                browserSync.reload(entry);
            }

            return buildResult;
        })
    };
};

const processSassComponent: Worker<string, BuildResult> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/${componentName}/demo.scss`);
        const write = writeFactory(joinPath('www', component.name, 'index.css'));
        const reload = reloadFactory({component, entry: 'index.css'});
        const watch = watchFactory(() => worker());

        const worker = () => watch(reload(write(buildSass(component.path))));

        return worker();
    });
};

const processTypeScriptComponent: Worker<string, BuildResult> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/${componentName}/demo.tsx`);
        const write = writeFactory(joinPath('www', component.name, 'index.js'));
        const reload = reloadFactory({component, entry: 'index.js'});

        return reload(write(buildTypeScript(component.path)));
    });
};

const processTwigComponent: Worker<string, BuildResult> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/${componentName}/demo.html.twig`);
        const write = writeFactory(joinPath('www', component.name, 'index.html'));
        const reload = serveFactory({component, entry: 'index.html'});

        return reload(write(buildTwig(component.path)));
    });
};

const componentName: string = 'button';

Promise.all([
    processTypeScriptComponent(componentName),
    processSassComponent(componentName)
]).then(() => {
    return processTwigComponent(componentName);
});