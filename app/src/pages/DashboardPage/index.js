import { CONTEXT_ATTRIBUTE, createElement, createPage, PUBLIC_BUS_PUBLISH_EVENT_TYPE, WINDOW_VARIABLE } from '@rollcakejs/rollcake-spa';
import MenuMf from "../../components/MenuMf";
import PlaylistBoardMf from "../../components/PlaylistBoardMf";
import PlayerMf from "../../components/PlayerMf";

import "./index.css";

const DashboardPage = () => createPage({
    onInit: function() {
        const winVar = window[WINDOW_VARIABLE.ROLLCAKE];
        if(!winVar[CONTEXT_ATTRIBUTE.STORE].getState('authentication')) {
            winVar[CONTEXT_ATTRIBUTE.BUS].publish(PUBLIC_BUS_PUBLISH_EVENT_TYPE.NAVIGATE_TO, '/');
        }
    },
    content: function() {
        return createElement({
            tag: 'div',
            attr: {
                class: 'dashboard'
            },
            children: [
                MenuMf(),
                PlaylistBoardMf(),
                PlayerMf()
            ]
        });
    }
});
export default DashboardPage;