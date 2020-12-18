import {DepartmentInterface} from "../../../../src/application/Model/department";

export const createDepartment: (properties: DepartmentInterface) =>
    DepartmentInterface = (properties) => {
    return {
        identifier: properties.identifier,
        label: properties.label,
    };
};

export const afc = createDepartment({
    identifier: 'afc',
    label: 'Administration Fiscale Cantonale'
});
export const ocpm = createDepartment({
    identifier: 'ocpm',
    label: 'Office Cantonal de la Population et des Migrations'
});

