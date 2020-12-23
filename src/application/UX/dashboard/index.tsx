import * as React from "react";
import {Component, createElement, FunctionComponent, ReactElement} from "react";

export type DashboardProperties = {
    token: string
};

export const Dashboard: FunctionComponent<DashboardProperties> = (properties) => createElement(class extends Component<DashboardProperties> {
    render() {
        const columns = [];

        for (let i = 0; i < 1000; i++) {
            columns.push(<div></div>);
        }

        return <div className="dashboard">
            <div className="video">
                <iframe src="https://www.youtube.com/embed/Ns-NO9_Nj3k" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        </div>;
    }
}, properties);

Dashboard.displayName = 'Dashboard';