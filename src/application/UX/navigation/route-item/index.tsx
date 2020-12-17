import * as React from "react";

import {Component, ReactElement} from "react";
import {createHref, on, RouteInterface} from "../../../../lib/Router";

export type NavigationRouteItemProperties = {
    route: RouteInterface<any>,
    label: string,
    icon: ReactElement
}

export type NavigationRouteItemState = {
    active: boolean
}

export class NavigationRouteItem extends Component<NavigationRouteItemProperties, NavigationRouteItemState> {
    constructor(properties: NavigationRouteItemProperties) {
        super(properties);

        this.state = {
            active: false
        };
    }

    componentDidMount() {
        on((route) => {
            this.setState({
                active: route === this.props.route
            });
        });
    }

    render() {
        let content: ReactElement = <span className="content">
            <span className="icon">{this.props.icon}</span>
            <span className="label">{this.props.label}</span>
        </span>;

        return this.state.active ? content : <a href={createHref(this.props.route, {})}>{content}</a>;
    }
}