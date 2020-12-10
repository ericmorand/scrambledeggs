import {redirect, register} from "./Router";
import {getUserToken, setContent, setUserToken} from "./Application";
import {Login} from "./UX/Login";
import {Dashboard} from "./UX/Dashboard";
import {PageWithNavigation} from "./UX/Page/with-navigation";

export const dashboardRoute = register('dashboard', [], () => {
    console.log('DEASHBOARD EXECUTOR');

    if (!getUserToken()) {
        redirect(loginRoute, {
            id: 'lorem',
            foo: 'ipsum'
        }, {
            callback: () => {
                console.log('AND CALLBACK !!!');

                redirect(dashboardRoute, {});
            }
        });
    } else {
        document.title = 'Dashboard';

        setContent(new PageWithNavigation({
            children: new Dashboard({
                token: getUserToken()
            }).render()
        }).render());
    }
});

export const loginRoute = register('login', ['id', 'foo'], ({id, foo}, state: {
    callback?: () => void
}) => {
    console.log('loginRoute EXECUTOR', id, foo, state);

    if (getUserToken()) {
        return redirect(dashboardRoute, {});
    }

    document.title = 'User login';

    let callback = state.callback;

    if (!callback) {
        callback = () => {
            redirect(dashboardRoute, {});
        };
    }

    setContent(new Login({
        callback
    }).render());
});

export const logoutRoute = register('logout', [], () => {
   setUserToken(null);

   redirect(dashboardRoute, {});
});