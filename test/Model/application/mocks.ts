import {ApplicationInterface, ApplicationProperties, DRAFT_STATUS} from "../../../src/Model/application";

import type {Status} from "../../../src/Model/application";

export const createMock = (properties: Partial<ApplicationProperties> & {
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
        service: {
            label: 'A service',
            identifier: '1'
        },
        tasks: [],
        treatmentDate: properties.treatmentDate || undefined,
        user: undefined
    };
};

export const taskWithLongTitle = createMock({})

export const taskWithLongMessage = createMock({})