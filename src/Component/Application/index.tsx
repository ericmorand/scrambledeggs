import {Component} from "react";

import type {ApplicationInterface} from "../../Model/application";

export type ApplicationProperties = {
  application: ApplicationInterface;
};

export abstract class Application<T extends ApplicationProperties = ApplicationProperties> extends Component<T> {
  get application(): ApplicationInterface {
    return this.props.application;
  }
}