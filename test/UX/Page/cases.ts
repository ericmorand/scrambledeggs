import type {ApplicationInterface} from "../../../src/modules/application/Model/application";
import {DONE_STATUS, ONGOING_STATUS, PENDING_STATUS} from "../../../src/modules/application/Model/application";
import {createApplicationMock} from "../../Model/application/mocks";

type ApplicationTestCase = {
  title: string;
  application: ApplicationInterface;
};

const testCases: Array<ApplicationTestCase> = [{
    title: 'Default',
    application: createApplicationMock({})
}, {
    title: 'With a long title',
    application: createApplicationMock({
        status: PENDING_STATUS
    })
}, {
    title: 'With a long title',
    application: createApplicationMock({
        subStatus: 'Waiting for documents'
    })
}, {
    title: 'With a long message',
    application: createApplicationMock({
        status: ONGOING_STATUS
    })
}, {
    title: 'With a long title',
    application: createApplicationMock({
        status: DONE_STATUS
    })
}];

export default testCases;