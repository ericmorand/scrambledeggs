import type {DocumentInterface} from "../../../../../src/modules/document/Model/document";

export const pdfDocument: DocumentInterface = {
    category: 'Doc category',
    title: 'PDF Document',
    reference: '123456',
    identifier: `${Math.random()}`,
    date: new Date(),
    type: "pdf",
    url: new URL('https://example.com')
};