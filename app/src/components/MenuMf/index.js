import { createElement, CUSTOM_ELEMENT_TAG } from "@rollcakejs/rollcake-spa";
import "./index.css";

const MenuMf = () => createElement({
    tag: CUSTOM_ELEMENT_TAG.MICROFRONTEND,
    attr: {
        name: 'menu-bucket',
        class: 'microfrontend microfrontend__menu'
    }
});
export default MenuMf;