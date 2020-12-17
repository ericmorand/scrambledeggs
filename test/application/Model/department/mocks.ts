import {DepartmentInterface} from "../../../../src/application/Model/department";

export const createDepartmentMock: (properties: Partial<DepartmentInterface>) =>
DepartmentInterface = (properties) => {
    return {
        identifier: properties.identifier || 'afc',
        label: properties.label || 'AFC',
    };
};

export const afc = createDepartmentMock({});
export const ocpm = createDepartmentMock({
    identifier: 'ocpm',
    label: 'OCPM'
});

