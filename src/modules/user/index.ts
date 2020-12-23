import {PageWithNavigation} from "../../application/UX/page/with-navigation";
import {setContent, setTitle} from "../../application";

import type {ModuleInterface} from "../../application";
import {createURL, registerRoute} from "routee";
import {Page} from "../../application/UX/page";
import {Login} from "./UI/login";
import {Logout} from "./UI/logout";

export const getUserToken = (): Promise<string> => {
    return new Promise<string>((resolve) => {
        const resolveFromLocalStorage = () => {
            resolve(localStorage.getItem('token'));
        }

        if (!localStorage.getItem('token')) {
            login((token) => {
                setUserToken(token);

                resolveFromLocalStorage();
            });
        } else {
            resolveFromLocalStorage();
        }
    });
};

export const setUserToken = (value: string | null): void => {
    if (value === null) {
        localStorage.removeItem('token');
    } else {
        localStorage.setItem('token', value);
    }
};

export const login = (callback: (token: string) => void) => {
    setContent(
        Page({
            title: 'Login',
            content: Login({
                callback
            })
        })
    );
};

export const logout = () => {
    setUserToken(null);

    setContent(
        Page({
            title: 'Logout',
            content: Logout({})
        })
    );
};

export const userProfileRoute = registerRoute('profile', [], ({}) => {
    setTitle('My Profile');

    setContent(
        PageWithNavigation({
            title: 'My Profile',
            content: null
        })
    );
});

export const userModule: ModuleInterface = {
    navigationItems: Promise.resolve([{
        url: createURL(userProfileRoute, {}),
        icon: 'face',
        route: userProfileRoute,
        label: 'My Profile'
    }])
}
