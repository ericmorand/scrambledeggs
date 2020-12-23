import {TaskInterface} from "../../../../../src/modules/application/Model/task";
import {createDice} from "@nightlycommit/d-n";

const d2 = createDice(2);

export const createTask = (properties: Partial<TaskInterface> = {}): TaskInterface => {
    return {
        title: properties.title || 'Task title',
        message: properties.message || 'Hell is not the outer mineral of the source. '.repeat(Math.ceil(Math.random() * 10)).trimEnd(),
        identifier: properties.identifier || `${Math.random()}`,
        creationDate: properties.creationDate || new Date(),
        completionDate: properties.completionDate || undefined,
        application: properties.application || undefined,
        dueDate: d2() < 2 ? new Date() : undefined
    }
};

export const taskWithLongTitle = createTask({
    title: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
})

export const taskWithLongMessage = createTask({
    message: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
})