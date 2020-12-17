import {ApplicationInterface, DRAFT_STATUS} from "../../../src/modules/application/Model/application";

import type {Status} from "../../../src/modules/application/Model/application";
import {afc, createDepartmentMock, ocpm} from "../../application/Model/department/mocks";

export const createApplicationMock = (properties: Partial<ApplicationInterface> & {
    status?: Status,
    subStatus?: string
} = {}): ApplicationInterface => {
    return {
        identifier: Math.random().toString(),
        status: properties.status || DRAFT_STATUS,
        subStatus: properties.subStatus || undefined,
        completionDate: properties.completionDate || undefined,
        creationDate: new Date(),
        depositDate: undefined,
        documents: [],
        department: properties.department || Math.random() > 0.5 ? afc : ocpm,
        tasks: [],
        treatmentDate: properties.treatmentDate || undefined,
        user: undefined
    };
};

export const applicationWithLongTitle = createApplicationMock({})
