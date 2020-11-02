import { createElement } from "@rollcakejs/rollcake-spa";
import "./index.css";

const LoadingOverlay = () => createElement({
    tag: 'div',
    attr: {
        class: 'loading-overlay'
    },
    children: [
        createElement({
            tag: 'img',
            attr: {
                class: 'loading-overlay__logo blink-image',
                src: 'assets/spotify_logo_white.png'
            }
        })
    ]
});
export default LoadingOverlay;