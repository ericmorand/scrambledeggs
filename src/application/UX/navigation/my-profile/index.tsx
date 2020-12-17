import * as React from "react";

import {userProfileRoute} from "../../../index";
import {Component, ReactElement} from "react";
import {NavigationRouteItem} from "../route-item";

export class MyProfile extends Component<any, any> {
    render() {
        const icon: ReactElement = <span>👤</span>;

        return <div className="my-profile">
            <NavigationRouteItem route={userProfileRoute} label="My Profile" icon={icon}/>
        </div>
    }
}