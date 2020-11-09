import {build as buildTypeScriptFactory} from "./lib/Typescript";
import {buildTwigFactory} from "./lib/Twig";
import {buildSassFactory} from "./lib/Sass";
import {join as joinPath} from "path";
import {TwingLoaderChain, TwingLoaderFilesystem, TwingLoaderRelativeFilesystem} from "twing";
import {parseJsonConfigFileContent, sys} from "typescript";
import {writeFactory} from "./lib/Write";
import {Worker} from "./lib/Worker";
import {Component} from "./lib/Component";
import {watchFactory} from "./lib/Watch";
import {reloadFactory, serveFactory} from "./lib/Serve";
import {readFileSync as readTsConfigFile} from "tsconfig";
import broaderify from "broaderify";

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

const componentName: string = 'viewport';

Promise.all([
    processTypeScriptComponent(componentName),
    processSassComponent(componentName)
]).then(() => {
    return processTwigComponent(componentName);
});