export type Dice = () => number;

export const createDice: (numberOfSides: number) => Dice = (numberOfSides) => {
    return (): number => {
        return Math.ceil((Math.random() || 1) * numberOfSides);
    };
};

export const d2 = createDice(2);
export const d4 = createDice(4);
export const d6 = createDice(6);
export const d10 = createDice(10);
export const d20 = createDice(20);
export const d100 = createDice(100);