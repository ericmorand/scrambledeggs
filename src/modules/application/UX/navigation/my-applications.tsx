import * as React from "react";

import {Component, ReactElement} from "react";
import {applicationsRoute} from "../../index";
import {NavigationRouteItem} from "../../../../application/UX/navigation/route-item";

export class MyApplications extends Component<any, any> {
    render() {
        const icon: ReactElement = <span>📄</span>;

        return <div className="my-applications">
            <NavigationRouteItem route={applicationsRoute} label="My Applications" icon={icon}/>
        </div>
    }
}