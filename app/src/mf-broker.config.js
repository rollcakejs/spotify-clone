import { RollCakeMFBroker } from '@rollcakejs/rollcake-spa';

const buckets = [
    {
        name: 'authentication-bucket',
        address: 'https://rollcake-spotify-clone-auth.herokuapp.com/'
    },
    {
        name: 'menu-bucket',
        address: 'https://rollcake-spotify-clone-menu.herokuapp.com/'
    },
    {
        name: 'playlist-board-bucket',
        address: 'https://rollcake-spotify-clone-pb.herokuapp.com/'
    },
    {
        name: 'player-bucket',
        address: 'https://rollcake-spotify-clone-player.herokuapp.com/'
    }
];

export default new RollCakeMFBroker(buckets);