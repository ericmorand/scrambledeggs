import * as React from "react";
import {Component} from "react";
import {createHref} from "../../../lib/Router";
import {homeRoute} from "../../index";

export type NotFoundProperties = {

};

export class NotFound extends Component<NotFoundProperties> {
    render() {
        return <div className="not-found">
            <h1>Page Not Found</h1>
            {/*todo: find a better way to declare the homepage*/}
            <a href={createHref(homeRoute, {})}>Back to Home</a>
        </div>;
    }
}