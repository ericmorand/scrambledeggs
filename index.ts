import {build as buildTypeScriptFactory} from "./lib/Typescript";
import {buildTwigFactory} from "./lib/Twig";
import {buildSassFactory} from "./lib/Sass";
import {buildBundleFactory} from "./lib/Bundle";
import {join as joinPath} from "path";
import {unlinkSync} from "fs";
import {TwingLoaderChain, TwingLoaderFilesystem, TwingLoaderRelativeFilesystem} from "twing";
import {parseJsonConfigFileContent, sys} from "typescript";
import {writeFactory} from "./lib/Write";
import {Worker} from "./lib/Worker";
import {Component} from "./lib/Component";
import {watchFactory} from "./lib/Watch";
import {reloadFactory, serveFactory} from "./lib/Serve";
import {readFileSync as readTsConfigFile} from "tsconfig";
import type {Options as BroaderifyOptions} from "broaderify";
import broaderify from "broaderify";
import {red} from 'colors/safe'
import * as yargs from "yargs";
import {Generator} from "./lib/commands/scaffold/component";
import {rebaseStyleSheetAssetsFactory} from "./lib/RebaseStyleSheetAssets";
import Tsify2 from "tsify2";

import type {StateInterface, StateWorker} from "./lib/State";
import type {Options as TsifyOptions} from "tsify2";

const generator = new Generator();

// generator.prompt()
//     .then((answers) => {
//         console.log(answers);
//
//         return generator.write(answers).then(() => {
//             const testGenerator = new TestGenerator();
//
//             return testGenerator.write({
//                 name: answers.name
//             });
//         });
//     });

// typeScript
const typeScriptConfig = parseJsonConfigFileContent(readTsConfigFile('./tsconfig.json'), sys, './');
const tsify = Tsify2(typeScriptConfig.options);

const buildTypeScript = buildBundleFactory({
    plugins: [
        <[any, TsifyOptions]>[tsify, {
            global: true
        }]
    ],
    transforms: [
        <[any, BroaderifyOptions]>[broaderify, {
            global: true,
            loaders: [{
                filter: /node_modules\/react\/index.js/,
                worker: (module, content, done) => {
                    done(Buffer.from('module.exports = require(\'./cjs/react.production.min.js\');'));
                }
            }, {
                filter: /node_modules\/react-dom\/index.js/,
                worker: (module, content, done) => {
                    done(Buffer.from('module.exports = require(\'./cjs/react-dom.production.min.js\');'));
                }
            }, {
                filter: /node_modules\/scheduler\/index.js/,
                worker: (module, content, done) => {
                    done(Buffer.from('module.exports = require(\'./cjs/scheduler.production.min.js\');'));
                }
            }]
        }]
    ],
    extensions: ['.ts', '.tsx'],
    sourceMap: true
})

// const buildTypeScript = buildTypeScriptFactory({
//     compilerOptions: typeScriptConfig.options,
//     cache: new Map()
// });

// twig
const filesystemLoader = new TwingLoaderFilesystem('.');

filesystemLoader.addPath('lib', 'Lib');
filesystemLoader.addPath('test', 'Test');

const loader = new TwingLoaderChain([
    new TwingLoaderRelativeFilesystem(),
    filesystemLoader
]);

const buildTwig = buildTwigFactory({
    loader: loader,
    environment: {
        auto_reload: true,
        cache: 'tmp/twig'
    }
});

// sass
const buildSass = buildSassFactory({
    sourceMap: true,
    sourceMapContents: true,
    sourceMapEmbed: true,
    outFile: 'index.css'
});

const rebaseStyleSheetAssets = rebaseStyleSheetAssetsFactory();

const maestro: (state: StateInterface) => (...workers: Array<StateWorker>) => Promise<StateInterface> = (state) => {
    return (...workers) => {
        return new Promise<StateInterface>((resolve) => {
            const process = (state: StateInterface): void => {
                console.time(state.name.toString());

                const worker = workers.shift();

                if (worker) {
                    const parent: StateInterface = state;

                    worker(state)
                        .then((state) => {
                            console.timeEnd(state.name.toString());

                            // if the previous state was returned by the worker, we ignore it
                            if (state !== parent) {
                                state.parent = parent;

                                if (state.error) {
                                    console.log(red(state.error.message));

                                    resolve(state);
                                } else {
                                    return process(state);
                                }
                            } else {
                                return process(state);
                            }
                        });
                } else {
                    resolve(state);
                }
            }

            process(state);
        });
    }
};

const states: Map<string, StateInterface> = new Map();

const processSassComponent: Worker<string, StateInterface> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/Component/${componentName}/demo.scss`, 'text/x-scss');
        const write = writeFactory(joinPath('www', component.name));
        const reload = reloadFactory({component, entry: 'index.css'});
        const watch = watchFactory(() => processSassComponent(componentName));
        const cleanDependencies: StateWorker = (state) => {
            return Promise.resolve(state).then((state) => {
                return {
                    name: Symbol('Clean SASS Dependencies'),
                    dependencies: state.dependencies.filter((dependency) => {
                        return typeof dependency === 'string';
                    }),
                    data: state.data
                }
            });
        };

        const clean: StateWorker = (state) => {
            return Promise.resolve(state).then((state?) => {
                if (state) {
                    for (let datum of state.data) {
                        console.log(joinPath('www', component.name, datum.name));

                        unlinkSync(joinPath('www', component.name, datum.name));
                    }
                }

                return state;
            });
        };

        const save: StateWorker = (state) => {
            return Promise.resolve(state).then((state) => {
                states.set(componentName, state);

                return state;
            });
        };

        return maestro(states.get(componentName))(clean).then(() => {
            return maestro(component.state)(buildSass).then((state) => {
                return maestro(state)(cleanDependencies, rebaseStyleSheetAssets, write, reload, watch, save);
            });
        });
    });
};

const processTypeScriptComponent: Worker<string, StateInterface> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/Component/${componentName}/demo.tsx`, 'text/x-typescript');
        const write = writeFactory(joinPath('www', component.name));
        const reload = reloadFactory({component, entry: 'index.js'});
        const watch = watchFactory(() => processTypeScriptComponent(componentName));
        const cleanDependencies: StateWorker = (state) => {
            return Promise.resolve(state).then((state) => {
                return {
                    name: Symbol('Clean Dependencies'),
                    dependencies: state.dependencies.filter((dependency) => {
                        return !/^(?:.*)\.d\.ts$/.test(dependency);
                    }),
                    data: state.data
                }
            });
        };

        return watch(reload(write(cleanDependencies(buildTypeScript(component.state)))));
    });
};

const processTwigComponent: Worker<string, StateInterface> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/Component/${componentName}/demo.html.twig`, 'text/x-twig');
        const write = writeFactory(joinPath('www', component.name));
        const serve = serveFactory({component, entry: 'index.html'});
        const watch = watchFactory(() => processTwigComponent(componentName));

        return watch(serve(write(buildTwig(component.state))));
    });
};

const serve = (componentName: string): Promise<StateInterface> => {
    return Promise.all([
        processTypeScriptComponent(componentName),
        processSassComponent(componentName)
    ]).then((states) => {
        // const f = (state: StateInterface) => {
        //     console.log(state.name);
        //
        //     if (state.parent) {
        //         f(state.parent);
        //     }
        // };
        //
        // for (let state of states) {
        //     f(state);
        // }

        return processTwigComponent(componentName);
    });
}

const components = ['button', 'viewport'];

yargs
    .command<{ component: string }>({
        command: 'serve <component>',
        aliases: ['$0', 's'],
        describe: 'serve a component',
        builder: (yargs) => {
            return yargs.positional('component', {
                describe: 'the name of the component to serve',
                choices: components
            });
        },
        handler: (argv) => {
            if (argv.component) {
                serve(argv.component);
            }
        }
    })
    .middleware((argv) => {
        if (components.includes(argv.component)) {
            return argv;
        } else {
            return {};
        }
    })
    .demandCommand()
    .fail((error) => {
        console.error('ERROR', error);
    })
    .argv;
