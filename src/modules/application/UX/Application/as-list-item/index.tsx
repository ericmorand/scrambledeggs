import * as React from "react";

import {Application} from "../index";
import {CANCELLED_STATUS, DONE_STATUS, DRAFT_STATUS, ONGOING_STATUS, PENDING_STATUS} from "../../../Model/application";

export class ApplicationAsListItem extends Application {
    render() {
        let status: string;
        let humanReadableStatus: string;

        if (this.application.subStatus) {
            status = 'blocked';
        } else {
            switch (this.application.status) {
                case DRAFT_STATUS: {
                    status = 'draft';
                    humanReadableStatus = 'Draft';
                    break;
                }
                case PENDING_STATUS: {
                    status = 'pending';
                    humanReadableStatus = 'Deposited';
                    break;
                }
                case ONGOING_STATUS: {
                    status = 'ongoing';
                    humanReadableStatus = 'In treatment';
                    break;
                }
                case DONE_STATUS: {
                    status = 'done';
                    humanReadableStatus = 'Done';
                    break;
                }
                case CANCELLED_STATUS: {
                    status = 'cancelled';
                    humanReadableStatus = 'Cancelled';
                    break;
                }
            }
        }

        return <div className="application" data-view-mode="list-item" data-status={status}>
            <div className="department">{this.application.service.category.label}</div>
            <div className="title">{this.application.service.label}</div>
            <div className={"status"}>
                <div className="badge">{this.application.subStatus || humanReadableStatus}</div>
            </div>
            <div className="date">{this.application.depositDate ? this.application.depositDate.toLocaleDateString() : null}</div>
            <div className="tools">
                <a href="#/application/5" target="_self" title="foo">
                    👁️
                </a>
            </div>
        </div>;
    }
}