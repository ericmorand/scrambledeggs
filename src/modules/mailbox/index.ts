import {List} from "../../application/UX/list";
import {PageWithNavigation} from "../../application/UX/page/with-navigation";
import {setContent, setTitle} from "../../application";
import type {ModuleInterface} from "../../application";
import {createURL, registerRoute} from "routee";

export const mailboxRoute = registerRoute('mailbox', [], () => {
    setTitle('My Mailbox');

    setContent(PageWithNavigation({
        title: 'My Mailbox',
        content: List({
            items: []
        })
    }));
});

export const mailboxModule: ModuleInterface = {
    navigationItems: Promise.resolve([{
        icon: 'mail',
        label: 'My Mailbox',
        url: createURL(mailboxRoute, {}),
        route: mailboxRoute
    }])
}
