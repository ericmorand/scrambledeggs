import {render} from "sass";

import type {Options} from "sass";
import type {StateWorkerFactory, StateInterface} from "./State";

export const stateName = Symbol('SASS');

export const buildSassFactory: StateWorkerFactory<Omit<Options, 'file'>> = (options) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const renderOptions: Options = options;

            // todo: we should handle every data that match the expected type 'text/x-scss'
            renderOptions.file = state.data[0].name;
            renderOptions.outFile = options.outFile || 'index.css';

            return new Promise<StateInterface>((resolve, reject) => {
                render(renderOptions, ((error, result) => {
                    if (error) {
                        resolve({
                            name: stateName,
                            data: [{
                                name: options.outFile,
                                type: 'text/css',
                                content: Buffer.from(''),
                                map: null
                            }],
                            dependencies: [
                                renderOptions.file,
                                error.file
                            ],
                            parent: state,
                            error: error
                        })
                    } else {
                        const {css, map, stats} = result;

                        resolve({
                            name: stateName,
                            data: [{
                                name: options.outFile,
                                type: 'text/css',
                                content: css,
                                map: map
                            }],
                            dependencies: stats.includedFiles,
                            parent: state
                        });
                    }
                }));
            })
        });
    };
};