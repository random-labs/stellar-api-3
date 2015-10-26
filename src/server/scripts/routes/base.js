import _ from 'lodash';
import Celestial from '../models/celestial';

class BaseRoute {

    constructor() {

    }

    index(req, res) {
        let body = '<html><body><h1>Data</h1>';

        Celestial.orderBy('dist_ly').run()
            .then(celestials => {
                const stars = _.filter(celestials, { type: 'Star' });
                const constellations = _.filter(celestials, { type: 'Constellation' });
                const galaxies = _.filter(celestials, { type: 'Galaxy' });

                body += '<h2>Stars</h2>';
                body += '<ul>';
                stars.forEach(item => {
                    body += `<li>${item.name}`;
                    if ('other_names' in item) {
                        body += ': ' + item.other_names.join(', ').substring(-2);
                    }
                    body += '</li>';
                });
                body += '</ul>';

                body += '<h2>Constellations</h2>';
                body += '<ul>';
                constellations.forEach(item => {
                    body += `<li>${item.name}`;
                    if ('other_names' in item) {
                        body += ': ' + item.other_names.join(', ').substring(-2);
                    }
                    body += '</li>';
                });
                body += '</ul>';

                body += '<h2>Galaxies</h2>';
                body += '<ul>';
                galaxies.forEach(item => {
                    body += `<li>${item.name}`;
                    if ('other_names' in item) {
                        body += ': ' + item.other_names.join(', ').substring(-2);
                    }
                    body += '</li>';
                });
                body += '</ul>';

                body += '</body></html>';

                res.send(body);
            });


        // res.send('Hello');
    }

}

export default BaseRoute;