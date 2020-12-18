import type {ApplicationInterface} from "../../../../src/modules/application/Model/application";
import {DONE_STATUS, ONGOING_STATUS, PENDING_STATUS} from "../../../../src/modules/application/Model/application";
import {createApplication} from "../../../modules/application/Model/application/mocks";

type ApplicationTestCase = {
  title: string;
  application: ApplicationInterface;
};

const testCases: Array<ApplicationTestCase> = [{
    title: 'Default',
    application: createApplication({})
}, {
    title: 'With a long title',
    application: createApplication({
        status: PENDING_STATUS
    })
}, {
    title: 'With a long title',
    application: createApplication({
        subStatus: 'Waiting for documents'
    })
}, {
    title: 'With a long message',
    application: createApplication({
        status: ONGOING_STATUS
    })
}, {
    title: 'With a long title',
    application: createApplication({
        status: DONE_STATUS
    })
}];

export default testCases;