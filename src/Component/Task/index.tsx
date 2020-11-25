import {Component} from "react";

import type {TaskInterface} from "../../Model/task";

export type TaskProperties = {
  task: TaskInterface;
};

export abstract class Task<T extends TaskProperties = TaskProperties> extends Component<T> {
  get task() {
    return this.props.task;
  }
}