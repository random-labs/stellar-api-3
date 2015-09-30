class BaseRoute {

    constructor() {

    }

    index(req, res) {
        res.send('Hello!');
    }

}

export default BaseRoute;