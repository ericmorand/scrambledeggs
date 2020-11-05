import {Component} from "react";
import * as React from "react";

import type {ReactElement} from "react";
import {render as reactRender} from "react-dom";

export type TestDefinition = {
    title: string,
    content: ReactElement
};

type DemoProperties = {
    title: string,
    tests: Array<TestDefinition>
};

class Demo extends Component<DemoProperties> {
    render() {
        return <div className="demo">
            <h1>{this.props.title}</h1>
            <div className="tests">
                {this.props.tests.map(({title, content}, index) => {
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
}

export const render = (title: string, tests: Array<TestDefinition>) => {
    document.addEventListener('DOMContentLoaded', () => {
        reactRender(<Demo title={title} tests={tests}/>, document.getElementById('application'));
    });
};
