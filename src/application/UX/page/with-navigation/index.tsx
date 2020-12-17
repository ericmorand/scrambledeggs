import * as React from "react";

import {Page} from "../index";
import {createHref} from "../../../../lib/Router";

import type {ReactElement} from "react";
import {homeRoute, navigationItems} from "../../../index";

export class PageWithNavigation extends Page {
    get navigationEntries(): Array<ReactElement> {
        const elements: Array<ReactElement> = [];

        for (let entry of navigationItems) {
            elements.push(<div className="item">
                {entry}
            </div>)
        }

        return elements;
    }

    render() {
        return <div className="page" data-layout="with-navigation">
            <div className="header">
                <a href={createHref(homeRoute, {})}>Home</a>
            </div>
            <div className="main">
                <div className="navigation">
                    {this.navigationEntries}
                </div>
                <div className="content">
                    {this.props.content}
                </div>
            </div>
        </div>
    }
}