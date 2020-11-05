import * as React from "react";
import {render} from "../index";
import {IdentityProviderTest} from "./index";

render('Identity Provider Demo', [{
    title: 'Default',
    content: <IdentityProviderTest/>
}, {
    title: 'With a custom name',
    content: <IdentityProviderTest name="This is a custom name"/>
}, {
    title: 'With a very long custom name',
    content: <IdentityProviderTest
        name="This is a very very very very very very very very very very very very very very very very very very very very very very very very long custom name"/>
}]);




