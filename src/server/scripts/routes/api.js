class ApiRoute {

    constructor(params) {
        this.thinky = params.thinky;
    }

    index(req, res) {
        res.json({ message: 'success' });
    }

}

export default ApiRoute;