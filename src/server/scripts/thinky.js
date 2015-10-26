import thinky from 'thinky';
import config from '../config';

const _thinky = thinky(config.rethinkdb);

export default _thinky;