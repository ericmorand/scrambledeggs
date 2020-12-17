import * as React from "react";
import {Component, ReactElement} from "react";
import {PinBoard} from "../PinBoard";
import {ApplicationAsListItem} from "../Application/as-list-item";
import {ApplicationProperties} from "../Application";
import {TaskInterface} from "../../Model/task";
import {TableTest} from "../../../../../test/application/UX/table";
import {Table} from "../../../../application/UX/table";
import {archivedApplicationsDataSource} from "../../Data/applications";

export type ApplicationDashboardProperties = {
    tasks: IterableIterator<TaskInterface>
};

export class ApplicationDashboard extends Component<ApplicationDashboardProperties> {
    render() {
        return <div className="application-dashboard">
            <div className="tasks">
                <PinBoard title="To do" tasks={[...this.props.tasks]}/>
            </div>
            <div className="applications">
                <div className="ongoing-applications">
                    <div className="header">
                        <h2>My Ongoing Applications</h2>
                    </div>
                    <div className="list">
                        <TableTest/>
                    </div>
                </div>
                <div className="archived-applications">
                    <div className="header">
                        <h2>My Archived Applications</h2>
                    </div>
                    <div className="list">
                        <Table dataSource={archivedApplicationsDataSource}/>
                    </div>
                </div>
            </div>
        </div>;
    }
}