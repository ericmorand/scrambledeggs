import {outputFile} from "fs-extra";
import {join as joinPath} from "path";

import type {StateWorkerFactory} from "./State";

export const writeFactory: StateWorkerFactory<string> = (destination) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const outputPromises = state.data.map((state) => {
                return new Promise((resolve, reject) => {
                    console.log('WRITE', state.name);

                    outputFile(joinPath(destination, state.name), state.content, (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(state);
                        }
                    });
                });
            });

            return Promise.all(outputPromises).then(() => {
               return state;
            });
        });
    }
};