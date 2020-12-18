import * as React from "react";
import {stub} from "sinon";

import type {FunctionComponent} from "react";
import type {ApplicationDashboardProperties} from "../../../../../src/modules/application/UX/dashboard";
import {ApplicationDashboard} from "../../../../../src/modules/application/UX/dashboard";
import {applicationsDataSource} from "../../../../../src/modules/application/Data/applications";
import {ApplicationInterface} from "../../../../../src/modules/application/Model/application";
import {createApplication} from "../../Model/application/mocks";

const count: number = Math.ceil(Math.random() * 20);
const applications: Array<ApplicationInterface> = [];

for (let i = 0; i < count; i++) {
    applications.push(createApplication());
}

stub(applicationsDataSource, 'get').callsFake((filter, sorter) => {
    console.log('applicationsDataSource GET', filter);

    return Promise.resolve(applications.filter((application) => {
        let isValid: boolean = filter.categoryIdentifier ? application.service.category.identifier === filter.categoryIdentifier : true;

        if (isValid && filter.statuses) {
            isValid = isValid && filter.statuses.includes(application.status);
        }

        return isValid;
    })[Symbol.iterator]());
});

export const ApplicationDashboardTest: FunctionComponent<ApplicationDashboardProperties> = ({tasks}) => {
    return <ApplicationDashboard tasks={tasks}/>;
};