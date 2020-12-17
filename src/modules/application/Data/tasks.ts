import {DataSourceInterface} from "../../../application/data-source";
import {taskWithLongMessage} from "../../../../test/Model/task/mocks";

import type {TaskInterface} from "../Model/task";

export const tasksDataSource: DataSourceInterface<TaskInterface> = {
    get: () => {
        const count: number = Math.ceil(Math.random() * 10);

        const results: Array<TaskInterface> = [];

        for (let i = 0; i < count; i++) {
            results.push(taskWithLongMessage);
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(results[Symbol.iterator]());
            }, 0);
        });
    }
}