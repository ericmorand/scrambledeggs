import {Component} from "react";
import * as React from "react";
import {Button} from "../button";

export type IdentityProviderProperties = {
    name?: string,
    buttonLabel?: string
};

export class IdentityProvider extends Component<IdentityProviderProperties> {
    render() {
        return <div className="identity-provider">
            <h2>{this.props.name ?? 'I am an Identity Provider and this is my default name'}</h2>
            <Button type="submit" label={this.props.buttonLabel ?? 'Submit'}/>
        </div>
    }
}