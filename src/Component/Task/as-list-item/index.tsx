import * as React from "react";

import {Task} from "../index";

export class TaskAsListItem extends Task {
    render() {
        return <div className="task" data-view-mode="list-item">
            <div className="header" title={this.task.title}>
                <div className="title">
                    {this.task.title}
                </div>
                <div className="actions">
                    <div className="action">
                        <a href="https://example.com" target="_blank" className="primary-action">Do something</a>
                    </div>
                    <div className="action">
                        <a href="https://example.com" target="_blank" className="secondary-action">Do something else</a>
                    </div>
                </div>
            </div>
            <details className="details">
                <div className="message">
                    {this.task.message}
                </div>
            </details>
        </div>;
    }
}