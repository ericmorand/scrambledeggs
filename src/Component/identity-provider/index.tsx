import {Component} from "react";
import * as React from "react";
import {Button} from "../button";

export type IdentityProviderProperties = {
    name?: string,
    buttonLabel?: string,
    value?: string
};

export type IdentityProviderState = {
    value?: string
};

export class IdentityProvider extends Component<IdentityProviderProperties, IdentityProviderState> {
    constructor(props: IdentityProviderProperties) {
        super(props);

        this.state = {};
    }

    get name(): string {
        return this.props.name ?? 'I am an Identity Provider and this is my default name';
    }

    get buttonLabel(): string {
        return this.props.buttonLabel ?? 'Submit';
    }

    get currentDate(): Date {
        return new Date();
    }

    get value(): string {
        return this.state.value;
    }

    set value(value: string) {
        this.setState((state) => {
          return {
              value: value
          }
        });
    }

    render() {
        return <div className="identity-provider">
            <h2>{this.name}</h2>
            <input value={this.props.value} onChange={(event) => {this.value = event.target.value}}/>
            <Button type="button" label={this.value && this.value.length ? this.value : this.buttonLabel} action={() => {
                alert(`It is ${this.currentDate.toLocaleTimeString()}, my name is "${this.name}" and you typed "${this.value}"`);
            }}/>
        </div>
    }
}