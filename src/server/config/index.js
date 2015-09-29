import _ from 'lodash';
import base from './base';
import prod from './prod';

const configs = {
    base,
    prod
}

const env = process.env.APP_ENV;
export default _.merge({}, base, configs[env]);
