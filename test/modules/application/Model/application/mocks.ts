import type {Status} from "../../../../../src/modules/application/Model/application";
import {
    ApplicationInterface,
    CANCELLED_STATUS,
    DONE_STATUS,
    DRAFT_STATUS,
    ONGOING_STATUS,
    PENDING_STATUS
} from "../../../../../src/modules/application/Model/application";
import {taxDeclaration, workPermitRequest} from "../service/mocks";
import {createDice} from "@nightlycommit/d-n";

export const createApplication = (properties: Partial<ApplicationInterface> & {
    status?: Status,
    subStatus?: string
} = {}): ApplicationInterface => {
    const statuses: Array<Status> = [
        DRAFT_STATUS,
        PENDING_STATUS,
        ONGOING_STATUS,
        DONE_STATUS,
        CANCELLED_STATUS
    ];

    const d2 = createDice(2);
    const d5 = createDice(5);

    const status: Status = properties.status || statuses[d5() - 1];

    return {
        identifier: Math.random().toString(),
        status: status,
        subStatus: properties.subStatus || undefined,
        completionDate: properties.completionDate || undefined,
        creationDate: new Date(),
        depositDate: status !== DRAFT_STATUS ? new Date() : undefined,
        documents: [],
        tasks: [],
        treatmentDate: properties.treatmentDate || undefined,
        user: undefined,
        service: properties.service || d2() < 2 ? taxDeclaration : workPermitRequest
    };
};

export const applicationWithLongTitle = createApplication({})
