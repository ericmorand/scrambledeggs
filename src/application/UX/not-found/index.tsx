import * as React from "react";
import {Component, createElement, FunctionComponent} from "react";
import {homeRoute} from "../../index";
import {createHref} from "../../router";
import {createURL} from "routee";

export const NotFound: FunctionComponent = () => createElement(class NotFound extends Component {
    render() {
        return <div className="not-found">
            <h1>Page Not Found</h1>
            <a href={createHref(createURL(homeRoute, {}))}>Back to Home</a>
        </div>;
    }
});