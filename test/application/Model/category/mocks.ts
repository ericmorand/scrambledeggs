import {CategoryInterface} from "../../../../src/application/Model/category";
import {DepartmentInterface} from "../../../../src/application/Model/department";
import {afc, ocpm} from "../department/mocks";

export const createCategory: (properties: Partial<CategoryInterface>) => CategoryInterface = (properties) => {
    const department: DepartmentInterface = properties.department || properties.parent.department;

    return {
        identifier: `${Math.random()}`,
        label: properties.label,
        department: department,
        parent: properties.parent
    }
};

export const tax = createCategory({
    department: afc,
    label: 'Tax'
});

export const workPermit = createCategory({
    department: ocpm,
    label: 'Work Permit'
});