import {render} from "dart-sass";

import type {Options} from "dart-sass";
import type {StateWorkerFactory, StateInterface} from "./State";

export const buildSassFactory: StateWorkerFactory<Omit<Options, 'file'>> = (options) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const renderOptions: Options = options;

            renderOptions.file = state.data[0].name;
            renderOptions.outFile = options.outFile || 'index.css';

            return new Promise<StateInterface>((resolve, reject) => {
                render(renderOptions, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        const {stats, css, map} = result;

                        return resolve({
                            data: [{
                                name: options.outFile,
                                type: 'text/css',
                                content: css,
                                map: map
                            }],
                            dependencies: stats.includedFiles
                        });
                    }
                })
            });
        });
    };
};