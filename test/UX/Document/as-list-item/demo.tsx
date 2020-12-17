import * as React from "react";
import {render} from "../../../index";
import {DocumentAsListItemTest} from "./index";

render('Document As List Item Demo', [{
    title: 'Default',
    content: <DocumentAsListItemTest document={{
        identifier: `${Math.random()}`,
        title: 'Avis de taxation ICC',
        url: new URL('https://enu.ge.ch/document.pdf'),
        date: new Date(),
        type: 'jpg',
        reference: 'AFU987ILU',
        category: 'A category'
    }}/>
}, {
    title: 'With a PDF type',
    content: <DocumentAsListItemTest document={{
        identifier: `${Math.random()}`,
        title: 'Décision de non imposition IFD',
        url: new URL('https://enu.ge.ch/document.pdf'),
        date: new Date(),
        type: 'pdf',
        reference: 'AFU987ILU',
        category: 'Another category'
    }}/>
}]);