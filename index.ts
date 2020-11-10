import {build as buildTypeScriptFactory} from "./lib/Typescript";
import {buildTwigFactory} from "./lib/Twig";
import {buildSassFactory} from "./lib/Sass";
import {join as joinPath, resolve as resolvePath} from "path";
import {TwingLoaderChain, TwingLoaderFilesystem, TwingLoaderRelativeFilesystem} from "twing";
import {parseJsonConfigFileContent, sys} from "typescript";
import {writeFactory} from "./lib/Write";
import {Worker} from "./lib/Worker";
import {Component} from "./lib/Component";
import {watchFactory} from "./lib/Watch";
import {reloadFactory, serveFactory} from "./lib/Serve";
import {readFileSync as readTsConfigFile} from "tsconfig";
import broaderify from "broaderify";
import {america, bgWhite, bgYellow, black, yellow, zalgo} from 'colors/safe'
import * as yargs from "yargs";
import {Generator} from "./lib/commands/scaffold/component";
import {Generator as TestGenerator} from "./lib/commands/scaffold/test";

const generator = new Generator();

generator.prompt()
    .then((answers) => {
        console.log(answers);

        return generator.write(answers).then(() => {
            const testGenerator = new TestGenerator();

            return testGenerator.write({
                name: answers.name
            });
        });
    });

import type {StateInterface} from "./lib/State";
import type {Options as BroaderifyOptions} from "broaderify";

// typeScript
const typeScriptConfig = parseJsonConfigFileContent(readTsConfigFile('./tsconfig.json'), sys, './');

const buildTypeScript = buildTypeScriptFactory({
    compilerOptions: typeScriptConfig.options,
    bundlerOptions: {
        extensions: ['.tsx', '.ts'],
        debug: true,
        transform: [
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
        ]
    }
})

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

const processSassComponent: Worker<string, StateInterface> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/${componentName}/demo.scss`, 'text/x-scss');
        const write = writeFactory(joinPath('www', component.name));
        const reload = reloadFactory({component, entry: 'index.css'});
        const watch = watchFactory(() => processSassComponent(componentName));

        return watch(reload(write(buildSass(component.state))));
    });
};

const processTypeScriptComponent: Worker<string, StateInterface> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/${componentName}/demo.tsx`, 'text/x-typescript');
        const write = writeFactory(joinPath('www', component.name));
        const reload = reloadFactory({component, entry: 'index.js'});
        const watch = watchFactory(() => processTypeScriptComponent(componentName));

        return watch(reload(write(buildTypeScript(component.state))));
    });
};

const processTwigComponent: Worker<string, StateInterface> = (componentName) => {
    return Promise.resolve(componentName).then((componentName) => {
        const component = new Component(componentName, `test/${componentName}/demo.html.twig`, 'text/x-twig');
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
    ]).then(() => {
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
                console.log(argv);

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
