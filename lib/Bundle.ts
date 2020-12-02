import type {BrowserifyObject} from "browserify";
import * as Browserify from "browserify";
import type {DatumInterface, StateWorkerFactory} from "./State";

export type PluginDefinition<T> = [(browserify: BrowserifyObject, opts: T) => any, T];
export type TransformDefinition<T> = [(browserify: string, opts: T) => NodeJS.ReadWriteStream, T];

export const stateName = Symbol('Bundle');

export type Options = {
    plugins?: Array<PluginDefinition<any>>,
    transforms?: Array<TransformDefinition<any>>,
    extensions?: Array<string>,
    sourceMap?: boolean
};

export const buildBundleFactory: StateWorkerFactory<Options> = (options?) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const dependencies: Array<string> = [];

            const renderPromises: Array<Promise<DatumInterface>> = state.data.map((datum) => {
                return new Promise((resolve, reject) => {
                    const browserify = Browserify({
                        extensions: options ? options.extensions : undefined,
                        debug: options ? options.sourceMap : false
                    }).on('file', (file) => {
                        dependencies.push(file);
                    }).add(datum.name);

                    for (let [transform, transformOptions] of options.transforms) {
                        browserify.transform(transform, transformOptions);
                    }

                    for (let [plugin, pluginOptions] of options.plugins) {
                        browserify.plugin(plugin, pluginOptions);
                    }

                    browserify.bundle((error, data) => {
                        if (error) {
                            reject(error);
                        }

                        resolve({
                            name: 'index.js',
                            type: 'text/javascript',
                            content: data,
                            map: null
                        });
                    });
                });
            });

            return Promise.all(renderPromises).then((data) => {
                return {
                    name: stateName,
                    data,
                    dependencies
                }
            });
        });
    };
};