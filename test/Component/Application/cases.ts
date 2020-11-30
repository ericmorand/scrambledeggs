import type {ApplicationInterface} from "../../../src/Model/application";
import {DONE_STATUS, ONGOING_STATUS, PENDING_STATUS} from "../../../src/Model/application";
import {createMock} from "../../Model/application/mocks";

type ApplicationTestCase = {
  title: string;
  application: ApplicationInterface;
};

const testCases: Array<ApplicationTestCase> = [{
    title: 'Default',
    application: createMock({})
}, {
    title: 'With a long title',
    application: createMock({
        status: PENDING_STATUS
    })
}, {
    title: 'With a long title',
    application: createMock({
        subStatus: 'Waiting for documents'
    })
}, {
    title: 'With a long message',
    application: createMock({
        status: ONGOING_STATUS
    })
}, {
    title: 'With a long title',
    application: createMock({
        status: DONE_STATUS
    })
}];

export default testCases;