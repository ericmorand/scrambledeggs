import {DataSourceInterface} from "../../../application/data-source";

import type {ApplicationInterface, Status} from "../Model/application";
import {CANCELLED_STATUS, DONE_STATUS, DRAFT_STATUS, ONGOING_STATUS, PENDING_STATUS} from "../Model/application";

type FilterInterface = {
    categoryIdentifier?: string,
    statuses?: Array<Status>
};

export type ApplicationsDataSource = DataSourceInterface<ApplicationInterface, FilterInterface>;

export const applicationsDataSource: ApplicationsDataSource = {
    get: (filter, sorter) => {
        // todo: here we should query the persistent storage layer
        return Promise.resolve([][Symbol.iterator]());
    }
}

export const nonArchivedApplicationsDataSource: ApplicationsDataSource = {
    get: (filter, sorter) => {
        console.log('nonArchivedApplicationsDataSource GET');

        filter.statuses = [
            PENDING_STATUS,
            ONGOING_STATUS
        ];

        return applicationsDataSource.get(filter, sorter);
    }
}

export const archivedApplicationsDataSource: ApplicationsDataSource = {
    get: (filter, sorter) => {
        filter.statuses = [
            DONE_STATUS,
            CANCELLED_STATUS
        ];

        return applicationsDataSource.get(filter, sorter);
    }
}