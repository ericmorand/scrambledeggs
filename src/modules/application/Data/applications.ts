import {DataSourceInterface} from "../../../application/data-source";
import {applicationWithLongTitle} from "../../../../test/Model/application/mocks";

import type {ApplicationInterface, Status} from "../Model/application";
import {DONE_STATUS} from "../Model/application";

type FilterInterface = {
    departmentId?: string,
    status?: Status
};

export type ApplicationsDataSource = DataSourceInterface<ApplicationInterface, FilterInterface>;

export const applicationsDataSource: ApplicationsDataSource = {
    get: () => {
        const count: number = Math.ceil(Math.random() * 10);

        const results: Array<ApplicationInterface> = [];

        for (let i = 0; i < count; i++) {
            results.push(applicationWithLongTitle);
        }

        return Promise.resolve(results[Symbol.iterator]());
    }
}

export const archivedApplicationsDataSource: ApplicationsDataSource = {
    get: (filter, sorter) => {
        filter.status = DONE_STATUS;

        return applicationsDataSource.get(filter, sorter);
    }
}