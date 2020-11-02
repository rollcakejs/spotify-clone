import { CONTEXT_ATTRIBUTE, createPage, PUBLIC_BUS_PUBLISH_EVENT_TYPE, WINDOW_VARIABLE } from '@rollcakejs/rollcake-spa';
import AuthenticatioMf from '../../components/AuthenticationMf';
import "./index.css";

const AuthenticationPage = () => createPage({
    onInit: function() {
        const winVar = window[WINDOW_VARIABLE.ROLLCAKE];
        const store = winVar[CONTEXT_ATTRIBUTE.STORE];
        const bus = winVar[CONTEXT_ATTRIBUTE.BUS];
        if (store.getState('authentication')) {
            bus.publish(PUBLIC_BUS_PUBLISH_EVENT_TYPE.NAVIGATE_TO, '/dashboard');
        } else {
            bus.subscribe('authorized-user-callback', (response) => {
                store.setState('authentication', response);
                bus.publish(PUBLIC_BUS_PUBLISH_EVENT_TYPE.NAVIGATE_TO, '/dashboard');
            });
        }
    },
    content: function() {
        return AuthenticatioMf();
    }
});

export default AuthenticationPage;