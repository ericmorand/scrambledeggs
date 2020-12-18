import * as React from "react";
import {Component, ReactElement} from "react";
import {ApplicationInterface} from "../../../modules/application/Model/application";
import {ApplicationAsListItem} from "../../../modules/application/UX/Application/as-list-item";
import {spinner} from "../spinner";
import {ApplicationsDataSource} from "../../../modules/application/Data/applications";
import {CategoryInterface} from "../../Model/category";

export type TableProperties = {
    dataSource: ApplicationsDataSource
};

export type TableState = {
    applications: Array<ApplicationInterface>,
    busy: boolean
};

export class Table extends Component<TableProperties, TableState> {
    protected _categories: Set<CategoryInterface>;

    constructor(properties: TableProperties) {
        super(properties);

        this.state = {
            applications: null,
            busy: false
        };

        this._categories = new Set();
    }

    componentDidMount() {
        console.log('DID MOUNT');

        this.setState({
            busy: true
        });

        this.fetchItems().then((applications) => {
            for (let application of applications) {
                this._categories.add(application.service.category);
            }

            console.log('FETCH DONE', this._categories);

            this.applications = applications;
        });
    }

    set applications(applications: Array<ApplicationInterface>) {
        this.setState({
            applications,
            busy: false
        });
    }

    fetchItems(categoryIdentifier: string = null): Promise<Array<ApplicationInterface>> {
        this.setState({
            busy: true
        });

        return this.props.dataSource.get({
            categoryIdentifier: categoryIdentifier
        }, {}).then((applications) => {
            return [...applications];
        });
    }

    render() {
        const items: Array<ReactElement> = [];

        if (this.state.applications) {
            for (let application of this.state.applications) {
                items.push(<div className="item">
                    <ApplicationAsListItem application={application}/>
                </div>);
            }
        }

        const options: Array<ReactElement> = [];

        for (let department of this._categories) {
            options.push(<option value={department.identifier}>{department.label}</option>);
        }

        return <div className="table">
            <div className="header">
                <div className="category">
                    <select onChange={(e) => {
                        this.fetchItems(e.target.value).then((applications) => {
                            this.applications = applications;
                        });
                    }}>
                        <option value="">Catégorie</option>
                        {options}
                    </select>
                </div>
                <div className="label">
                    Application Label
                </div>
                <div className="status">
                    Application Status
                </div>
                <div className="date">
                    Deposit Date
                </div>
                <div className="action"/>
            </div>
            <div className="body">
                {items.length > 0 ?
                    <div className="items">{items}</div> :
                    <div className="no-items">No items</div>
                }
            </div>
            {this.state.busy ? <div className="loader">{spinner({})}</div> : null}
        </div>;
    }
}