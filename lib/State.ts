import type {WorkerFactory, Worker} from "./Worker";

export interface DatumInterface {
    name: string;
    type: string;
    content: Buffer;
    map: Buffer;
}

export interface StateInterface {
    data: Array<DatumInterface>;
    dependencies: Array<string>;
    parent?: StateInterface;
    error?: Error;
}

export type StateWorker = Worker<StateInterface>;
export type StateWorkerFactory<P> = WorkerFactory<P, StateInterface>;