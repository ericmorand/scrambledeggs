export type Worker<I, O = I> = (input?: I | Promise<I>) => Promise<O>;
export type WorkerFactory<P, I, O = I> = (properties: P) => Worker<I, O>;

// examples
const add: WorkerFactory<number, number> = (a) => {
    return (b) => {
        return Promise.resolve(b).then((b) => {
            return Promise.resolve(a + b);
        });
    }
}

add(2)(3).then((r) => {
    console.assert(r === 5);
});
