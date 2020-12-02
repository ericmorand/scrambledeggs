import {lstatSync} from "fs";

import type {DatumInterface, StateWorkerFactory} from "./State";
import type {CompilerOptions, Diagnostic} from "typescript";
import {
    CompilerHost,
    createIncrementalCompilerHost,
    createIncrementalProgram,
    EmitAndSemanticDiagnosticsBuilderProgram,
    SourceFile
} from "typescript";

export const stateName = Symbol('TypeScript');
export const type = 'text/x-typescript';

/**
 * @internal
 */
type CompiledFileOutput = {
    fileName: string,
    content: string
};

/**
 * @internal
 */
class CompiledFile {
    private _etag: number;
    private _source: SourceFile;
    private _output: CompiledFileOutput;

    set etag(value: number) {
        this._etag = value;
    }

    get etag(): number {
        return this._etag;
    }

    set source(value: SourceFile) {
        this._source = value;
    }

    get source(): SourceFile {
        return this._source;
    }

    set output(value: CompiledFileOutput) {
        this._output = value;
    }

    get output(): CompiledFileOutput {
        return this._output;
    }
}

let tsBuildInfo: string;

export type Options = {
    compilerOptions: CompilerOptions,
    cache: Map<string, CompiledFile>
};

export const build: StateWorkerFactory<Options> = (options) => {
    return (state) => {
        console.time('TS2');

        const {compilerOptions, cache} = options;

        /**
         * TypeScript refuses to emit files that have the same path as their source.
         * It means that JavaScript files are not emitted if outDir is not set.
         */
        compilerOptions.outDir = '|tsify|';

        const isTypeScript = (fileName: string): boolean => {
            return (/\.tsx?$/i).test(fileName);
        };

        const isJavaScript = (fileName: string): boolean => {
            return (/\.jsx?$/i).test(fileName);
        };

        return Promise.resolve(state).then((state) => {
            for (let datum of state.data) {
                if (datum.type === type) {
                    const fileName = datum.name;
                    const host = createIncrementalCompilerHost(compilerOptions);

                    const stateData: Array<DatumInterface> = [];
                    const stateDependencies: Array<string> = [
                        datum.name
                    ];

                    /**
                     * Write or update the cache
                     */
                    host.writeFile = (destinationFileName, data, writeByteOrderMark, onError, sourceFiles) => {

                        if (isBuildInfoFile(destinationFileName)) {
                            // noop, not supported
                            tsBuildInfo = data;
                        } else {
                            const writeFile = (fileName: string) => {
                                let compiledFile: CompiledFile;

                                compiledFile = getCompiledFile(fileName);

                                destinationFileName = destinationFileName.replace('|tsify|/', '');

                                stateData.push({
                                    content: Buffer.from(data),
                                    type: 'text/javascript',
                                    name: destinationFileName,
                                    map: undefined
                                });

                                compiledFile.output = {
                                    content: data,
                                    fileName: destinationFileName,
                                };

                                cacheCompiledFile(fileName, compiledFile);
                            }

                            for (let sourceFile of sourceFiles) {
                                writeFile(sourceFile.fileName);
                            }
                        }
                    };

                    const readFile = host.readFile;

                    host.readFile = (fileName: string) => {
                        if (isBuildInfoFile(fileName)) {
                            return tsBuildInfo;
                        }

                        return readFile(fileName);
                    };

                    const getSourceFile = host.getSourceFile;

                    host.getSourceFile = (fileName: string, languageVersion): SourceFile => {
                        if (isBuildInfoFile(fileName)) {
                            return getSourceFile(fileName, languageVersion);
                        }

                        let compiledFile: CompiledFile = getCompiledFile(fileName);

                        if (compiledFile) {
                            return compiledFile.source;
                        }

                        const source: SourceFile = getSourceFile(fileName, languageVersion);

                        const {mtimeMs} = lstatSync(fileName);

                        compiledFile = new CompiledFile();
                        compiledFile.etag = mtimeMs;
                        compiledFile.source = source;

                        cacheCompiledFile(fileName, compiledFile);

                        return source;
                    };

                    const isBuildInfoFile = (fileName: string): boolean => {
                        return fileName === compilerOptions.tsBuildInfoFile;
                    };

                    const createProgram = (options: CompilerOptions, rootNames: Array<string>, host: CompilerHost): EmitAndSemanticDiagnosticsBuilderProgram => {
                        return createIncrementalProgram({rootNames, options, host});
                    };

                    const getCache = (key: string): CompiledFile => {
                        if (!cache.has(key)) {
                            cache.set(key, new CompiledFile());
                        }

                        return cache.get(key);
                    };

                    const cacheCompiledFile = (key: string, compiledFile: CompiledFile) => {
                        cache.set(key, compiledFile);
                    };

                    const getCompiledFile = (fileName: string): CompiledFile | undefined => {
                        const compiledFile = getCache(fileName);
                        const {mtimeMs} = lstatSync(fileName);

                        if (compiledFile.etag === mtimeMs) {
                            return compiledFile;
                        }

                        return undefined;
                    };

                    const compile = (fileName: string): CompiledFile => {
                        console.log('COMPILE', fileName);

                        const program = createProgram(compilerOptions, [fileName], host);

                        let diagnostics: readonly Diagnostic[] = [
                            ...program.getSyntacticDiagnostics(),
                            ...program.getOptionsDiagnostics(),
                            ...program.getGlobalDiagnostics(),
                            ...program.getSemanticDiagnostics()
                        ];

                        if (diagnostics.length) {
                            for (let diagnostic of diagnostics) {
                                //eventEmitter.emit('error', new TransformError(diagnostic));
                            }

                            return undefined;
                        }

                        program.emit();

                        return getCompiledFile(fileName);
                    };

                    let compiledFile: CompiledFile = getCompiledFile(fileName);

                    if (!compiledFile) {
                        compiledFile = compile(fileName);
                    }

                    console.timeEnd('TS2');

                    return {
                        data: stateData,
                        name: stateName,
                        dependencies: stateDependencies
                    };
                }
            }
        });
    };
};