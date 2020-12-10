import * as React from "react";
import {Component} from "react";
import {setUserToken} from "../../Application";

export type LoginProperties = {
    callback: () => void
};

export class Login extends Component<LoginProperties> {
    protected submit() {
        this.props.callback();
    }

    render() {
        return <div className="login">
            <form method="POST" onSubmit={(event) => {
                setUserToken('123456');

                event.preventDefault();

                this.submit();
            }}>
                <input type="text"/>
                <input type="password"/>
                <button type="submit">Submit</button>
                <div className="square"></div>
            </form>
        </div>;
    }
}