import {RebaseHandler, Rebaser} from "css-source-map-rebase/dist/lib/Rebaser";
import {parse} from "url";
import {readFileSync} from "fs";
import {lookup} from "mime-types";

import type {DatumInterface, StateWorkerFactory} from "./State";

export const stateName = Symbol('CSS Source Map Rebase');

export type Options = {
    rebase?: RebaseHandler
};

export const rebaseStyleSheetAssetsFactory: StateWorkerFactory<Options> = (options?) => {
    return (state) => {
        return Promise.resolve(state).then((state) => {
            const rebases: Array<Promise<DatumInterface>> = [];

            const dependencies: Array<string> = [];
            const assets: Array<DatumInterface> = [];

            for (let datum of state.data) {
                const rebaser = new Rebaser({
                    map: datum.map,
                    rebase: options ? options.rebase : undefined
                });

                rebaser.on('rebase', (rebasedPath, resolvedPath) => {
                    if (!parse(resolvedPath).protocol) {
                        dependencies.push(resolvedPath);

                        try {
                            const type = lookup(rebasedPath);

                            assets.push({
                                name: rebasedPath,
                                type: type || 'application/octet-stream',
                                map: undefined,
                                content: readFileSync(resolvedPath)
                            });
                        } catch (err) {
                            // noop
                        }
                    }
                });

                if (datum.type === 'text/css') {
                    rebases.push(rebaser.rebase(datum.content).then((result) => {
                        return {
                            content: result.css,
                            map: result.map,
                            type: datum.type,
                            name: datum.name
                        };
                    }));
                }
            }

            return Promise.all(rebases).then((data) => {
                console.log(data.concat(assets));

                return {
                    name: stateName,
                    parent: state,
                    data: data.concat(assets),
                    dependencies: state.dependencies.concat(dependencies)
                };
            });
        });
    };
};