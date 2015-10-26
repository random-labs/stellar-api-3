import Celestial from '../models/celestial';

class ApiRoute {

    index(req, res) {
        res.json({ message: 'Welcome to the Stellar API. See the documentation for more information.' });
    }

    celestials(req, res) {
        const filters = req.query;

        Celestial.filter(filters).run()
            .then(celestials => {
                res.json(celestials);
            })
            .error(handleError(res));
    }

    celestial(req, res) {
        const id = req.params.id;

        Celestial.get(id).run()
            .then(celestial => {
                res.json(celestial);
            })
            .error(handleError(res));
    }

    celestialTypes(req, res) {
        Celestial.pluck('type').distinct().execute()
            .then(types => {
                res.json(types);
            })
            .error(handleError(res));
    }

    events(req, res) {
        Event.run()
            .then(events => {
                res.json(events);
            })
            .error(handleError(res));
    }

}

function handleError(res) {
    return error => {
        console.log(error.message);
        return res.json(500, { error: error.message });
    }
}

export default ApiRoute;