export type Worker<I, O = I> = (input: I | Promise<I>) => Promise<O>;
export type WorkerFactory<P, I, O = I> = (properties?: P) => Worker<I, O>;
