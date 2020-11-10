import * as YeomanGenerator from "yeoman-generator";
import {normalize as normalizePath, sep as pathSeparator, resolve as resolvePath, join as joinPath} from "path";
import {createSlug} from "speakingurl";

import type {Questions, GeneratorOptions} from "yeoman-generator";

type Answer = {
    name: string,
    primitive: boolean,
    author: string
};

export class Generator {
    protected readonly _generator: YeomanGenerator;

    constructor() {
        this._generator = new YeomanGenerator<GeneratorOptions>([], {});
        this._generator.sourceRoot('./lib/commands/scaffold/templates/component');
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
        }, {
            type: 'boolean',
            name: 'primitive',
            message: 'Is the component a primitive?',
            default: false,
            store: true
        }, {
            type: 'input',
            name: 'author',
            message: 'Author of the component',
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
            const author = answers.author;

            // paths
            const destinationPath = joinPath('src', name);

            // data
            let data = {
                name: name,
                author: author,
                cleanName: toSlug(name),
                camelName: toTitleCase(name)
            };

            let extensions = [answers.primitive ? 'ts' : 'tsx', 'scss'];

            for (let extension of extensions) {
                generator.fs.copyTpl(
                    generator.templatePath(`index.${extension}.ejs`),
                    generator.destinationPath(destinationPath, `index.${extension}`),
                    data
                );
            }

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
