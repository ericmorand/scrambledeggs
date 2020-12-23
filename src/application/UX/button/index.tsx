import * as React from "react";
import {FunctionComponent} from "react";

type ButtonProperties = {
    flavor?: 'default',
    type?: 'button' | 'submit',
    action: () => void,
    label: string
};

export const Button: FunctionComponent<ButtonProperties> = ({type, action, label}) => {
    return <button className={'button'} data-flavor={'default'} type={type || 'button'} onClick={() => {action();}}>{label}</button>;
};

Button.displayName = 'Button';