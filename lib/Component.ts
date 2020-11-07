import type {StateInterface} from "./State";

export class Component {
    private readonly _name: string;
    private readonly _path: string;
    private readonly _type: string;

    constructor(name: string, path: string, type: string) {
        this._name = name;
        this._path = path;
        this._type = type;
    }

    get name(): string {
        return this._name;
    }

    get state(): StateInterface {
        return {
            data: [{
                name: this._path,
                type: this._type,
                content: null,
                map: null
            }],
            dependencies: []
        };
    }
}
