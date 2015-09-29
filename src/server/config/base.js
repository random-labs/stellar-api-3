export default {
    server: {
        port: process.env.PORT || 3000
    },
    rethinkdb: {
        host: 'localhost',
        port: 28015,
        authKey: '',
        db: 'stellar'
    }
};