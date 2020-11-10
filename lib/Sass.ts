import {renderSync} from "sass";

import type {SyncOptions as Options} from "sass";
import type {StateWorkerFactory, StateInterface} from "./State";

export const buildSassFactory: StateWorkerFactory<Omit<Options, 'file'>> = (options) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const renderOptions: Options = options;

            renderOptions.file = state.data[0].name;
            renderOptions.outFile = options.outFile || 'index.css';

            const {stats, css, map} = renderSync(renderOptions);

            return Promise.resolve<StateInterface>({
                data: [{
                    name: options.outFile,
                    type: 'text/css',
                    content: css,
                    map: map
                }],
                dependencies: stats.includedFiles
            });
        });
    };
};