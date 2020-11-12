import {Gaze} from "gaze";
import * as ora from "ora";

import type {StateInterface, StateWorkerFactory} from "./State";

interface GazeEventEmitter {
    on(event: 'changed', listener: (filepath: string) => void): this;

    on(event: 'all', listener: (event: 'added' | 'changed' | 'renamed' | 'deleted', filepath: string) => void): this;
}

export type WatchFactoryParameters = () => Promise<StateInterface>;

export const watchFactory: StateWorkerFactory<WatchFactoryParameters> = (callback) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            return new Promise((resolve) => {
                new Gaze(state.dependencies, {}, (error, watcher) => {
                    (watcher as unknown as GazeEventEmitter).on('changed', () => {
                        watcher.close();

                        callback();
                    });

                    resolve(state);
                });
            });
        });
    };
};