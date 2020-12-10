import {Component} from "react";

export type PageProperties = {
    // content:
};

export abstract class Page<T extends PageProperties = PageProperties> extends Component<T> {

}