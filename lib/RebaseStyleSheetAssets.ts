import type {Options} from "css-source-map-rebase";
import type {StateWorkerFactory} from "./State";

export const stateName = Symbol('CSS Source Map Rebase');

export const rebaseStyleSheetAssets: StateWorkerFactory<Options> = (options) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            for (let datum of state.data) {
                if (datum.type === 'text/css') {

                }
            }
        });
    };
};