import * as React from "react";
import {Component, createElement} from "react";

import type {FunctionComponent} from "react";

export type LoginProperties = {
    callback: (token: string) => void
};

export const Login: FunctionComponent<LoginProperties> = (properties) => createElement(class extends Component<LoginProperties> {
    protected submit() {
        this.props.callback(`${Math.random()}`);
    }

    render() {
        return <div className="login">
            <form method="POST" onSubmit={(event) => {
                event.preventDefault();

                this.submit();
            }}>
                <input type="text"/>
                <input type="password"/>
                <button type="submit">Submit</button>
            </form>
        </div>;
    }
}, properties);