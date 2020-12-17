import * as React from "react";

import type {FunctionComponent} from "react";

import {Table} from "../../../../src/application/UX/table";
import {ApplicationInterface} from "../../../../src/modules/application/Model/application";
import {createApplicationMock} from "../../../Model/application/mocks";

export const TableTest: FunctionComponent = () => {
    const applications: Array<ApplicationInterface> = [];

    for (let i = 0; i < 20; i++) {
        applications.push(createApplicationMock());
    }

    return <Table dataSource={{
        get: (filter, sorter): Promise<IterableIterator<ApplicationInterface>> => {
            console.log('FILTER', filter);

            const items = applications.filter((application) => {
                let isValid: boolean = filter.departmentId ? (application.department.identifier === filter.departmentId) : true;

                if (isValid && filter.status) {
                    isValid = isValid && application.status === filter.status;
                }

               return isValid
            });

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(items[Symbol.iterator]());
                }, 700);
            });
        }
    }} />;
};