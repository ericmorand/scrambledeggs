import {setContent, setTitle} from "../../application";
import type {ModuleInterface} from "../../application";
import {createURL, registerRoute} from "routee";
import {PageWithNavigation} from "../../application/UX/page/with-navigation";

export const documentsRoute = registerRoute('documents', [], () => {
    setTitle('My Documents');

    setContent(PageWithNavigation({
        title: 'My Documents',
        content: null
    }));
});

export const documentModule: ModuleInterface = {
    navigationItems: Promise.resolve([{
        icon: 'folder',
        label: 'My Documents',
        url: createURL(documentsRoute, {}),
        route: documentsRoute
    }])
}
