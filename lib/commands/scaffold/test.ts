import * as YeomanGenerator from "yeoman-generator";
import {normalize as normalizePath, sep as pathSeparator, join as joinPath, relative as relativePath} from "path";
import {createSlug} from "speakingurl";

import type {Questions, GeneratorOptions} from "yeoman-generator";

type Answer = {
    name: string
};

export class Generator {
    protected readonly _generator: YeomanGenerator;

    constructor() {
        this._generator = new YeomanGenerator<GeneratorOptions>([], {});
        this._generator.sourceRoot('./lib/commands/scaffold/templates/test');
    }

    prompt() {
        let questions: Questions<Answer> = [{
            type: 'input',
            name: 'name',
            message: 'Name of the component',
            validate: (input: string) => {
                return input.length > 0;
            },
            store: true
        }];

        return this._generator.prompt<Answer>(questions);
    }

    write(answers: Answer) {
        return new Promise((resolve, reject) => {
            const toSlug = createSlug({
                separator: '--'
            });
            const toTitleCase = (value: string) => {
                const toTitleCase = createSlug({
                    titleCase: true
                });

                return value.split(pathSeparator).map((part) => {
                    return toTitleCase(part);
                }).join('');
            };

            const generator = this._generator;

            const name = answers.name;

            // paths
            const destinationPath = joinPath('test', name);

            // todo: a test can come without a component
            const componentPath = joinPath('src', name);
            const relativePathToComponent: string = normalizePath(relativePath(destinationPath, componentPath));

            // data
            let data = {
                name: name,
                cleanName: toSlug(name),
                camelName: toTitleCase(name),
                relativePathToComponent: relativePathToComponent
            };

            let extensions = ['tsx', 'scss'];

            for (let extension of extensions) {
                generator.fs.copyTpl(
                    generator.templatePath(`index.${extension}.ejs`),
                    generator.destinationPath(destinationPath, `index.${extension}`),
                    data
                );
            }

            extensions = ['tsx', 'scss', 'html.twig'];

            for (let extension of extensions) {
                generator.fs.copyTpl(
                    generator.templatePath(`demo.${extension}.ejs`),
                    generator.destinationPath(destinationPath, `demo.${extension}`),
                    data
                );
            }

            console.log('DONE');

            generator.fs.commit((error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
