import {register} from "../../lib/Router";
import {List} from "../../application/UX/list";
import {PageWithNavigation} from "../../application/UX/page/with-navigation";
import {setContent, setTitle} from "../../application";
import {MyMailbox} from "./UX/navigation/my-mailbox";

import type {ModuleInterface} from "../../application";
import {createElement} from "react";

export const mailboxRoute = register('mailbox', [], () => {
    setTitle('My Mailbox');

    setContent(new PageWithNavigation({
        content: new List({
            items: []
        }).render()
    }).render());
});

export const mailboxModule: ModuleInterface = {
    navigationItems: Promise.resolve([
        createElement(MyMailbox)
    ])
}
