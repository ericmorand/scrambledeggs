import type {TaskInterface} from "../../../src/modules/_/Model/task";
import {createTask} from "../../Model/task/mocks";

type TaskTestCase = {
  title: string;
  task: TaskInterface;
};

const testCases: Array<TaskTestCase> = [{
    title: 'Default',
    task: createTask({})
}, {
    title: 'With a long title',
    task: createTask({
        title: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
    })
}, {
    title: 'With a long message',
    task: createTask({
        message: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
    })
}];

export default testCases;