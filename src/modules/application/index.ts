import {PageWithNavigation} from "../../application/UX/page/with-navigation";
import {setContent, setTitle} from "../../application";

import type {ModuleInterface} from "../../application";
import {tasksDataSource} from "./Data/tasks";
import {Spinner} from "../../application/UX/spinner";
import {createURL, registerRoute} from "routee";
import {getUserToken} from "../user";
import {ApplicationsDashboard} from "./UX/dashboard";

export const applicationRoute = registerRoute('application', ['id'], ({id}) => {

});

export const applicationsRoute = registerRoute('applications', [], () => {
    setTitle('My Applications');

    setContent(PageWithNavigation({
        title: 'My Applications',
        content: Spinner({})
    }));

    Promise.all([
        tasksDataSource.get({}, {})
    ]).then(([tasks]) => {
        getUserToken().then(() => {
            setContent(
                PageWithNavigation({
                    title: 'My Applications',
                    content: ApplicationsDashboard({
                        tasks
                    })
                })
            );
        });
    });
});

export const applicationModule: ModuleInterface = {
    navigationItems: Promise.resolve([{
        url: createURL(applicationsRoute, {}),
        icon: 'assignment',
        route: applicationsRoute,
        label: 'My Applications'
    }])
}
