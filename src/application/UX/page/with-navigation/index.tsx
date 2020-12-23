import * as React from "react";
import {Component, createElement, FunctionComponent} from "react";
import {Page, PageProperties} from "../index";
import type {ReactElement} from "react";
import {currentRoute, navigationItems, on} from "../../../index";
import {createHref} from "../../../router";
import {RouteInterface} from "routee";
import {logout} from "../../../../modules/user";
import {Button} from "../../button";
import {Icon} from "../../icon";

export const PageWithNavigation: FunctionComponent<PageProperties> = (properties) => createElement(class extends Component<PageProperties, {
    route: RouteInterface<any>
}> {
    constructor(properties: PageProperties) {
        super(properties);

        this.state = {
            route: currentRoute
        };
    }

    get navigationEntries(): Array<ReactElement> {
        const elements: Array<ReactElement> = [];

        for (let {route, label, icon, url} of navigationItems) {
            elements.push(<div className="item" data-active={route === this.state.route ? '1' : '0'}>
                <a href={createHref(url)}>
                    <div className={"icon"}>
                        <Icon name={icon}/>
                    </div>
                    <div className={"label"}>{label}</div>
                </a>
            </div>)
        }

        return elements;
    }

    componentDidMount() {
        // listen to current route change
        on((route) => {
            this.setState({
                route
            });
        });
    }

    render() {
        return <div className="page-with-navigation">
            <div className="header"></div>
            <div className="main">
                <div className="navigation">
                    {this.navigationEntries}
                    <Button action={() => {
                        logout();
                    }} label={'Log out'}/>
                </div>
                <div className="content">
                    <Page title={this.props.title} content={this.props.content}/>
                </div>
            </div>
        </div>
    }
}, properties);

PageWithNavigation.displayName = 'PageWithNavigation';