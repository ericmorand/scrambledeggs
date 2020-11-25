import * as React from "react";
import {render} from "../../index";
import {DocumentTest} from "./index";

render('Document Demo', [{
    title: 'Default',
    content: <DocumentTest document={{
        title: 'A document',
        url: new URL('https://enu.ge.ch/document.pdf'),
        date: new Date(),
        type: 'jpg'
    }}/>
}, {
    title: 'With a PDF type',
    content: <DocumentTest document={{
        title: 'A PDF document',
        url: new URL('https://enu.ge.ch/document.pdf'),
        date: new Date(),
        type: 'pdf'
    }}/>
}]);