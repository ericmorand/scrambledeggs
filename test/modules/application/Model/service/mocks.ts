import {ServiceInterface} from "../../../../../src/modules/application/Model/service";
import {CategoryInterface} from "../../../../../src/application/Model/category";
import {tax, workPermit} from "../../../../application/Model/category/mocks";
import {d2} from "../../../../../src/lib/d-n";

export const createService: (properties: Partial<ServiceInterface>) => ServiceInterface = (properties) => {
    const categories: Array<CategoryInterface> = [
        tax, workPermit
    ];

    return {
        category: properties.category || categories[d2() - 1],
        label: properties.label || 'Lorem Ipsum Dolor Sit Amet',
        identifier: `${Math.random()}`
    }
};

export const taxDeclaration = createService({
    label: 'Tax Declaration',
    category: tax
});

export const workPermitRequest = createService({
    label: 'Work Permit Request',
    category: workPermit
});