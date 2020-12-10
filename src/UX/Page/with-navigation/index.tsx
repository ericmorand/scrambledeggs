import * as React from "react";

import {Page} from "../index";

export class PageWithNavigation extends Page {
    render() {
        return <div className="page" data-layout="with-navigation">
            <div className="header">
            </div>
            <div className="main">
                <div className="navigation">
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}