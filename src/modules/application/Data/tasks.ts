import {DataSourceInterface} from "../../../application/data-source";

import type {TaskInterface} from "../Model/task";

export const tasksDataSource: DataSourceInterface<TaskInterface> = {
    get: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([][Symbol.iterator]());
            }, 0);
        });
    }
}