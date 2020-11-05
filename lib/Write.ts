import {WorkerFactory} from "./Worker";
import {BuildResult} from "./BuildResult";
import {outputFile} from "fs-extra";

export const writeFactory: WorkerFactory<string, BuildResult> = (destination) => {
    return (buildResult) => {
        return Promise.resolve(buildResult).then((buildResult) => {
            return new Promise((resolve, reject) => {
                outputFile(destination, buildResult.data, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(buildResult);
                    }
                });
            });
        });
    }
};