import * as React from "react";

import {Application} from "../index";
import {DONE_STATUS, DRAFT_STATUS, ONGOING_STATUS, PENDING_STATUS} from "../../../Model/application";
import {fooBarRoute} from "../../../RouteProvider";
import {Anchor} from "../../../Component/Anchor";

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
            }
        }

        return <div className="application" data-view-mode="list-item" data-status={status}>
            <div className="title">{this.application.service.label}</div>
            <div className="tools">
                <div className="badge">{this.application.subStatus || humanReadableStatus}</div>
                <a href={fooBarRoute.createUrl({
                    id: this.application.identifier,
                    name: this.application.service.label
                })} target="_self" title="foo">
                    👁️
                </a>
            </div>
        </div>;
    }
}