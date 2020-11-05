import {render} from "dart-sass";
import {WorkerFactory} from "./Worker";

import type {Options} from "dart-sass";
import type {BuildResult} from "./BuildResult";

export const build: WorkerFactory<Omit<Options, 'file'>, string, BuildResult> = (options) => {
    return (fileName) => {
        return Promise.resolve(fileName).then((fileName) => {
            options.file = fileName;

            return new Promise<BuildResult>((resolve, reject) => {
                render(options, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        const {stats, css} = result;

                        return resolve({
                            files: stats.includedFiles,
                            data: css
                        });
                    }
                })
            });
        });
    };
};