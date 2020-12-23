import * as React from "react";
import {Component, createElement, ReactElement} from "react";

export const Splash: () => ReactElement = () => createElement(class extends Component {
    render() {
        return <div className="splash">
            <h1>Welcome to the ENU</h1>
        </div>;
    }
});