import {createElement} from "react";
import {register} from "../../lib/Router";
import {setContent, setTitle} from "../../application";
import {pdfDocument} from "../../../test/Model/document/mocks";
import {MyDocuments} from "./UX/navigation/my-documents";
import {PageWithNavigationTest} from "../../../test/UX/Page/with-navigation";
import {ListTest} from "../../../test/UX/List";
import {DocumentAsListItemTest} from "../../../test/UX/Document/as-list-item";
import {DocumentBundleTest} from "../../../test/UX/DocumentBundle";

import type {ModuleInterface} from "../../application";

export const documentsRoute = register('documents', [], () => {
    setTitle('My Documents');

    setContent(
        PageWithNavigationTest({
            content: ListTest({
                items: [
                    DocumentAsListItemTest({
                        document: pdfDocument
                    }),
                    DocumentBundleTest({
                        documents: [
                            pdfDocument,
                            pdfDocument,
                            pdfDocument
                        ],
                        label: "Impôts 2019"
                    }),
                    DocumentBundleTest({
                        documents: [
                            pdfDocument,
                            pdfDocument,
                            pdfDocument,
                            pdfDocument,
                            pdfDocument,
                            pdfDocument
                        ],
                        label: "Impôts 2020"
                    }),
                    DocumentAsListItemTest({
                        document: pdfDocument
                    }),
                    DocumentAsListItemTest({
                        document: pdfDocument
                    }),
                ]
            })
        })
    );
});

export const documentModule: ModuleInterface = {
    navigationItems: Promise.resolve([
        createElement(MyDocuments)
    ])
}
