import type {BrowserifyObject, Options as BrowserifyOptions} from "browserify";
import Transform from "tsify2/dist/lib/Transform";
import type {CompilerOptions} from "typescript";
import type {DatumInterface, StateWorkerFactory} from "./State";
import {EventEmitter} from "events";

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

    const eventEmitter = new EventEmitter;
    const transform = Transform(compilerOptions, eventEmitter);

    return (state) => {
        return Promise.resolve(state).then((state) => {
            const dependencies: Array<string> = [];
            const results: Array<DatumInterface> = [];

            const renderPromises: Array<Promise<DatumInterface>> = state.data.map((datum) => {

                const filesEncountered: Array<string> = [];

                return new Promise((resolve, reject) => {
                    eventEmitter.on('file', (file: string) => {
                        if (!filesEncountered.includes(file)) {
                            filesEncountered.push(file);

                            console.log(file);

                            if (!/^(?:.*)\.d\.ts$/.test(file)) {
                                transform(file, {
                                    global: true
                                }).on('data', (chunk) => {
                                    console.log(chunk.toString());

                                    results.push({
                                        type: '',
                                        content: chunk,
                                        name: file + '.mjs',
                                        map: undefined
                                    });
                                }).end();
                            }
                        }
                    });

                    transform(datum.name, {
                        global: true
                    }).on('data', (chunk) => {
                        console.log(chunk.toString());

                        results.push({
                            type: '',
                            content: chunk,
                            name: datum.name + '.mjs',
                            map: undefined
                        });
                    }).end();
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