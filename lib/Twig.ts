import {TwingEnvironment} from "twing";

import type {TwingSource, TwingEnvironmentOptions, TwingLoaderInterface} from "twing"
import type {DatumInterface, StateWorkerFactory} from "./State";

export type Options = {
    environment: TwingEnvironmentOptions,
    loader: TwingLoaderInterface
};

export const stateName = Symbol('Twig');

export const buildTwigFactory: StateWorkerFactory<Options> = (options) => {
    return (state) => {
        const environment = new TwingEnvironment(options.loader, options.environment);

        return Promise.resolve(state).then((state) => {
            const filePromises: Array<Promise<string>> = [];

            const onTemplate = (name: string, from: TwingSource) => {
                const loader = environment.getLoader();

                filePromises.push(loader.exists(name, from).then((exists) => {
                    if (exists) {
                        return loader.resolve(name, from);
                    }
                }));
            };

            environment.on('template', onTemplate);

            const renderPromises: Array<Promise<DatumInterface>> = state.data.map((datum) => {
                return environment.loadTemplate(datum.name)
                    .then((template) => {
                        return template.render({
                            applicationName: 'application'
                        });
                    })
                    .then((data) => {
                        return {
                            name: 'index.html',
                            type: 'text/html',
                            content: Buffer.from(data),
                            map: null
                        };
                    });
            });

            return Promise.all(renderPromises).then((data) => {
                environment.removeListener('template', onTemplate);

                return Promise.all(filePromises).then((dependencies) => {
                    return {
                        name: stateName,
                        data,
                        dependencies
                    }
                });
            });
        });
    };
};