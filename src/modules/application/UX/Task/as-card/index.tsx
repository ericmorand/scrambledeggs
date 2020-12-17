import * as React from "react";

import {Task} from "../index";

export class TaskAsCard extends Task {
    render() {
        return <div className="task" data-view-mode="card">
            <div className="content">
                <div className="header" title={this.task.title}>
                    {this.task.title}
                </div>
                <div className="message">
                    {this.task.message}
                </div>
                <div className="actions">
                    <div className="action">
                        <a href="https://example.com" target="_blank" className="primary-action">Do something</a>
                    </div>
                    <div className="action">
                        <a href="https://example.com" target="_blank" className="secondary-action">Do something else</a>
                    </div>
                </div>
                {this.task.dueDate ? <div className="footer">
                    <div className="due-date">
                        <span>{this.task.dueDate.toLocaleString()}</span>
                    </div>
                </div> : ''}
            </div>
        </div>;
    }
}