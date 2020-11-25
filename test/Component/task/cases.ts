import type {TaskInterface} from "../../../src/Model/task";
import {createMock} from "./mocks";

type TaskTestCase = {
  title: string;
  task: TaskInterface;
};

const testCases: Array<TaskTestCase> = [{
    title: 'Default',
    task: createMock({})
}, {
    title: 'With a long title',
    task: createMock({
        title: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
    })
}, {
    title: 'With a long message',
    task: createMock({
        message: 'Sons rise with greed at the rainy port degas! Madness ho! break to be viewed. The moon rises yellow fever like an evil lubber. The jack breaks with pestilence, mark the cook islands. Ahoy, proud mast. you won\'t hail the bahamas. All mates taste clear, weird jolly rogers. How sunny. You haul like a comrade. Ah, avast. The mainland grows desolation like an evil tuna. The codfish hoists with urchin, pull the bahamas before it whines!'
    })
}];

export default testCases;