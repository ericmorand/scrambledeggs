import * as React from "react";

import type {FunctionComponent} from "react";

import {Table} from "../../../../src/application/UX/table";
import {ApplicationInterface} from "../../../../src/modules/application/Model/application";
import {createApplication} from "../../../modules/application/Model/application/mocks";

export const TableTest: FunctionComponent = () => {
    const applications: Array<ApplicationInterface> = [];

    for (let i = 0; i < 20; i++) {
        applications.push(createApplication());
    }

    return <Table dataSource={{
        get: (filter, sorter): Promise<IterableIterator<ApplicationInterface>> => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([][Symbol.iterator]());
                }, 700);
            });
        }
    }} />;
};