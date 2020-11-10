import * as React from "react";

import type {ReactElement, FunctionComponent} from "react";
import {render as reactRender} from "react-dom";

export type TestDefinition = {
    title: string,
    content: ReactElement
};

type DemoProperties = {
    title: string,
    tests: Array<TestDefinition>
};

const Demo: FunctionComponent<DemoProperties> = ({title, tests}) => {
    return <div className="demo">
        <h1>{title}</h1>
        <div className="tests">
            {tests.map(({title, content}, index) => {
                return <div className="test" key={index}>
                    <header>{title}</header>
                    <div className="content">
                        {content}
                    </div>
                </div>
            })}
        </div>
    </div>;
}

export const render = (title: string, tests: Array<TestDefinition>) => {
    document.addEventListener('DOMContentLoaded', () => {
        const element = document.getElementById('application');

        if (element) {
            reactRender(<Demo title={title} tests={tests}/>, element);
        }
    });
};
