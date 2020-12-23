import {applicationModule} from "./application";
import {documentModule} from "./document";
import {mailboxModule} from "./mailbox";
import {userModule} from "./user";

export default [
    userModule,
    applicationModule,
    documentModule,
    mailboxModule
];