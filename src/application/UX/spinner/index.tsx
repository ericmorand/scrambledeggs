import * as React from "react";

import type {FunctionComponent} from "react";

export const spinner: FunctionComponent = () => {
  return <div className="loading-indicator">
    <div className="spinner"/>
  </div>;
};