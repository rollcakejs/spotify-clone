import { createElement, CUSTOM_ELEMENT_TAG } from "@rollcakejs/rollcake-spa";
import "./index.css";

const PlaylistBoardMf = () => createElement({
    tag: CUSTOM_ELEMENT_TAG.MICROFRONTEND,
    attr: {
        name: 'playlist-board-bucket',
        class: 'microfrontend microfrontend__playlist-board'
    }
});
export default PlaylistBoardMf;