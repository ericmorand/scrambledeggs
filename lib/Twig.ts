import {TwingEnvironment} from "twing";

import type {TwingSource, TwingEnvironmentOptions, TwingLoaderInterface} from "twing"
import type {WorkerFactory} from "./Worker";
import type {BuildResult} from "./BuildResult";

export type Options = {
    environment: TwingEnvironmentOptions,
    loader: TwingLoaderInterface
};

export const build: WorkerFactory<Options, string, BuildResult> = (options) => {
    const environment = new TwingEnvironment(options.loader, options.environment);

    return (name) => {
        return Promise.resolve(name).then((name) => {
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

            return environment.loadTemplate(name)
                .then((template) => {
                    return template.render({
                        applicationName: 'application'
                    });
                })
                .then((data) => {
                    environment.removeListener('template', onTemplate);

                    return Promise.all(filePromises).then((files) => {
                        return {
                            files,
                            data: Buffer.from(data)
                        };
                    });
                });
        });
    };
};