import { RollCakeSpa } from '@rollcakejs/rollcake-spa';
import MFBroker from './mf-broker.config';
import Router from './router.config';
import LoadingOverlay from './components/LoadingOverlay';
import './global.css';

new RollCakeSpa(MFBroker, Router, document.getElementById('root'), LoadingOverlay);