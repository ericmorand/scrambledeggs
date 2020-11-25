import {Component} from "react";

import * as React from "react";

import {IdentityProvider, IdentityProviderProperties} from "../../src/identity-provider";

export class IdentityProviderTest extends Component<IdentityProviderProperties> {
    render() {
        return <IdentityProvider name={this.props.name}/>;
    }
}

