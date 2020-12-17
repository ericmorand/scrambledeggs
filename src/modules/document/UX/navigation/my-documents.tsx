import * as React from "react";

import {Component, ReactElement} from "react";
import {documentsRoute} from "../../index";
import {NavigationRouteItem} from "../../../../application/UX/navigation/route-item";

export class MyDocuments extends Component<any, any> {
    render() {
        const icon: ReactElement = <span>📁</span>;

        return <div className="my-documents">
            <NavigationRouteItem route={documentsRoute} label="My Documents" icon={icon}/>
        </div>
    }
}