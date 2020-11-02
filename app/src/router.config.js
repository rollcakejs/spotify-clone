import { RollCakeRouter, NAVIGATION_MODE } from '@rollcakejs/rollcake-spa';
import AuthenticationPage from './pages/AuthenticationPage';
import DashboardPage from './pages/DashboardPage';

const routes = [
    {
        path: '/',
        item: AuthenticationPage
    },
    {
        path: '/dashboard',
        item: DashboardPage
    }
];

export default new RollCakeRouter({
    routes,
    mode: NAVIGATION_MODE.HISTORY
});