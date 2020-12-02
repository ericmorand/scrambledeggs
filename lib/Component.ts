import type {StateInterface} from "./State";

export interface ComponentInterface {
    name: string;
    path: string;
    type: string;
    state: StateInterface;
}

export class Component implements ComponentInterface {
    private readonly _name: string;
    private readonly _path: string;
    private readonly _type: string;

    constructor(name: string, path: string, type: string) {
        this._name = name;
        this._path = path;
        this._type = type;
    }

    get path(): string {
        return this._path;
    }

    get type(): string {
        return this._type;
    }

    get name(): string {
        return this._name;
    }

    get state(): StateInterface {
        return {
            name: Symbol(this.name),
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
