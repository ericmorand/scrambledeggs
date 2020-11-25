import {TaskInterface, TaskProperties} from "../../../src/Model/task";

export const createMock = (properties: Partial<TaskProperties> = {}): TaskInterface => {
    return {
        title: properties.title || 'Task title',
        message: properties.message || 'Hell is not the outer mineral of the source.'.repeat(Math.ceil(Math.random() * 10)),
        identifier: properties.identifier || `${Math.random()}`,
        creationDate: properties.creationDate || new Date(),
        completionDate: properties.completionDate || undefined,
        application: properties.application || undefined
    }
};

export const taskWithLongTitle = createMock({
    title: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
})

export const taskWithLongMessage = createMock({
    message: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
})