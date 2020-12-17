import {register} from "../../lib/Router";
import {PageWithNavigation} from "../../application/UX/page/with-navigation";
import {MyApplications} from "./UX/navigation/my-applications";
import {setContent, setTitle} from "../../application";

import type {ModuleInterface} from "../../application";
import {ApplicationDashboard} from "./UX/dashboard";
import {createElement} from "react";
import {applicationsDataSource} from "./Data/applications";
import {tasksDataSource} from "./Data/tasks";
import {spinner} from "../../application/UX/spinner";

export const applicationsRoute = register('applications', [], () => {
    setTitle('My Applications');

    setContent(createElement(PageWithNavigation, {
        content: createElement(spinner)
    }));

    Promise.all([
        tasksDataSource.get({}, {})
    ]).then(([tasks]) => {
        setContent(createElement(PageWithNavigation, {
            content: createElement(ApplicationDashboard, {
                tasks
            })
        }));
    });

});

export const applicationModule: ModuleInterface = {
    navigationItems: Promise.resolve([
        createElement(MyApplications)
    ])
}
