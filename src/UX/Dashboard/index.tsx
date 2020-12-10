import * as React from "react";
import {Component} from "react";
import {createHref} from "../../Router";
import {logoutRoute} from "../../RouteProvider";

export type DashboardProperties = {
    token: string
};

export class Dashboard extends Component<DashboardProperties> {
    render() {
        return <div className="dashboard">
            {this.props.token}
            <a href={createHref(logoutRoute, {})}>Logout</a>
        </div>;
    }
}