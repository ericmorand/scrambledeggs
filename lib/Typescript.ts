import * as Browserify from "browserify";
import Tsify2 from "tsify2";

import type {WorkerFactory} from "./Worker";
import type {Options as BrowserifyOptions, BrowserifyObject} from "browserify";
import type {Options as Tsify2Options} from "tsify2";
import type {CompilerOptions} from "typescript";
import type {BuildResult} from "./BuildResult";

export type Parameters = {
    compilerOptions: CompilerOptions,
    bundlerOptions: BrowserifyOptions
    bundlerPlugins?: Array<PluginDefinition<any>>,
    bundlerTransforms?: Array<TransformDefinition<any>>,
};

export type PluginDefinition<T> = {
    executor: (browserify: BrowserifyObject, opts: T) => any,
    options: T
};

export type TransformDefinition<T> = {
    executor: (browserify: string, opts: T) => NodeJS.ReadWriteStream,
    options: T
};

export const build: WorkerFactory<Parameters, string, BuildResult> = (parameters) => {
    const {compilerOptions, bundlerOptions, bundlerTransforms} = parameters;

    const tsify = Tsify2(compilerOptions);

    return (path) => {
        return Promise.resolve(path).then((path) => {
            const files: Array<string> = [];

            return new Promise((resolve, reject) => {
                console.time('Bundling');

                const browserify = Browserify(bundlerOptions)
                    .plugin<Tsify2Options>(tsify, {})
                    .on('file', (file) => {
                        files.push(file);
                    })
                    .add(path);

                for (let {executor, options} of bundlerTransforms) {
                    browserify.transform(executor, options);
                }

                browserify.bundle((error, data) => {
                    console.timeEnd('Bundling');

                    if (error) {
                        reject(error);
                    }

                    resolve({files, data});
                });
            });
        });
    };
};