import { createElement, CUSTOM_ELEMENT_TAG } from "@rollcakejs/rollcake-spa";
import "./index.css";

const PlayerMf = () => createElement({
    tag: CUSTOM_ELEMENT_TAG.MICROFRONTEND,
    attr: {
        name: 'player-bucket',
        class: 'microfrontend microfrontend__player'
    }
});
export default PlayerMf;