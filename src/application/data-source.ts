import {EntityInterface} from "./Model/entity";

export interface DataSourceInterface<E extends EntityInterface, F extends {} = {}, S extends {} = {}> {
    get: (filter: F, sorter: S) => Promise<IterableIterator<E>>;
}