import * as React from "react";

import {Component, ReactElement} from "react";
import {NavigationRouteItem} from "../../../../../application/UX/navigation/route-item";
import {mailboxRoute} from "../../../index";

export class MyMailbox extends Component<any, any> {
    render() {
        const icon: ReactElement = <span>📫</span>;

        return <div className="my-mailbox">
            <NavigationRouteItem route={mailboxRoute} label="My Mailbox" icon={icon}/>
        </div>
    }
}