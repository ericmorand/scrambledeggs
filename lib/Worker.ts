export type Worker<I, O = I> = (input: I | Promise<I>) => Promise<O>;
export type WorkerFactory<P, I, O = I> = (properties?: P) => Worker<I, O>;

// examples
const aFactory: WorkerFactory<undefined, number> = () => {
    return (a) => {
        return Promise.resolve(a).then((a) => {
            return a;
        });
    };
};

const p: Worker<number> = (n) => {
    return Promise.resolve(n).then((w) => {
        return w + 5;
    });
}

const a = aFactory();

const worker = p(a(5));

worker.then((d) => {
    console.log(d);
})

