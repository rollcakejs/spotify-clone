import { createElement, CUSTOM_ELEMENT_TAG } from "@rollcakejs/rollcake-spa";
import "./index.css";

const AuthenticatioMf = () => createElement({
    tag: CUSTOM_ELEMENT_TAG.MICROFRONTEND,
    attr: {
        name: 'authentication-bucket',
        class: 'microfrontend'
    }
});
export default AuthenticatioMf;