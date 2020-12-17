import * as React from "react";

import {homeRoute} from "../../../index";
import {Component, ReactElement} from "react";
import {NavigationRouteItem} from "../route-item";

export class MyDashboard extends Component<any, any> {
    render() {
        const icon: ReactElement = <span>📋</span>;

        return <div className="my-dashboard">
            <NavigationRouteItem route={homeRoute} label="My Dashboard" icon={icon}/>
        </div>
    }
}