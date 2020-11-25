import {outputFile} from "fs-extra";
import {join as joinPath} from "path";

import type {DatumInterface, StateWorkerFactory} from "./State";

export const writeFactory: StateWorkerFactory<string> = (destination) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const outputPromises = state.data.map((datum) => {
                return new Promise<DatumInterface>((resolve, reject) => {
                    outputFile(joinPath(destination, datum.name), datum.content, (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(datum);
                        }
                    });
                });
            });

            return Promise.all(outputPromises)
                .then(() => {
                    return state;
                });
        });
    }
};