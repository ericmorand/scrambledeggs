import * as Browserify from "browserify";
import Tsify2 from "tsify2";

import type {Options as BrowserifyOptions, BrowserifyObject} from "browserify";
import type {Options as Tsify2Options} from "tsify2";
import type {CompilerOptions} from "typescript";
import type {DatumInterface, StateWorkerFactory} from "./State";

export type PluginDefinition<T> = [(browserify: BrowserifyObject, opts: T) => any, T];
export type TransformDefinition<T> = [(browserify: string, opts: T) => NodeJS.ReadWriteStream, T];

export const stateName = Symbol('TypeScript');

export type Parameters = {
    compilerOptions: CompilerOptions,
    bundlerOptions: BrowserifyOptions & {
        plugin?: Array<PluginDefinition<any>>,
        transform?: Array<TransformDefinition<any>>
    }
};

export const build: StateWorkerFactory<Parameters> = (parameters) => {
    const {compilerOptions, bundlerOptions} = parameters;

    const tsify = Tsify2(compilerOptions);

    return (state) => {
        return Promise.resolve(state).then((state) => {
            const dependencies: Array<string> = [];

            const renderPromises: Array<Promise<DatumInterface>> = state.data.map((datum) => {
                return new Promise((resolve, reject) => {
                    const browserify = Browserify(bundlerOptions)
                        .plugin<Tsify2Options>(tsify, {})
                        .on('file', (file) => {
                            dependencies.push(file);
                        })
                        .add(datum.name);

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