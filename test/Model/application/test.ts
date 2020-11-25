import * as tape from "tape";
import {Application, ApplicationInterface} from "../../../src/Model/application";
import {stub} from "sinon";

import type {TaskInterface} from "../../../src/Model/task";

tape('Application', (test) => {
    type ApplicationProperties = {
        depositDate?: Date;
        treatmentDate?: Date;
        completionDate?: Date;
        tasks?: Array<TaskInterface>;
    };

    const createApplication = (properties: ApplicationProperties): ApplicationInterface => {
        return new Application({
            identifier: '1',
            creationDate: new Date(),
            depositDate: properties.depositDate,
            treatmentDate: properties.treatmentDate,
            completionDate: properties.completionDate,
            tasks: properties.tasks || [],
            documents: [],
            service: {
                identifier: '1'
            },
            user: {
                identifier: '1',
                firstName: 'Lorem',
                lastName: 'Ipsum',
                fullName: 'Lorem Ipsum'
            }
        });
    };

    test.test('status', (test) => {
        test.same(createApplication({}).status, 'draft', 'should be "draft" when the deposit date is not set');
        test.same(createApplication({
            depositDate: new Date()
        }).status, 'pending', 'should be "pending" when the deposit date is set');
        test.same(createApplication({
            depositDate: new Date(),
            treatmentDate: new Date()
        }).status, 'ongoing', 'should be "ongoing" when the treatment date is set');
        test.same(createApplication({
            depositDate: new Date(),
            treatmentDate: new Date(),
            completionDate: new Date()
        }).status, 'done', 'should be "done" when the completion date is set');

        test.end();
    });

    test.test('subStatus', (test) => {
        const date = new Date();

        const application = createApplication({});

        test.same(application.subStatus, undefined, 'should be undefined when the status is not "ongoing"');

        stub(application, 'status').value('ongoing');

        test.same(application.subStatus, undefined, 'should be undefined when the status is "ongoing" and there is no tasks');

        stub(application, 'tasks').value(<Array<TaskInterface>>[{
            identifier: '1',
            message: 'First task',
            creationDate: date,
            completionDate: new Date()
        }]);

        test.same(application.subStatus, undefined, 'should be undefined when the status is "ongoing" and there is no pending tasks');

        stub(application, 'tasks').value(<Array<TaskInterface>>[{
            identifier: '1',
            message: 'First task',
            creationDate: date,
            completionDate: undefined
        }, {
            identifier: '2',
            message: 'Least recent',
            creationDate: new Date(date.getTime() - 1),
            completionDate: undefined
        }, {
            identifier: '3',
            message: 'Third task',
            creationDate: date,
            completionDate: undefined
        }]);

        test.same(application.subStatus, 'Least recent', 'should be the label of the least recent pending task when the status is "ongoing" and there are pending tasks');

        test.end();
    });
});