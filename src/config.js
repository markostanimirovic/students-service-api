const port = 3001;
const dbUser = 'marko';
const dbPassword = 'Marko.123';
const dbUrl = 'mongodb+srv://' + dbUser + ':' + dbPassword + '@students-service-db-esuyv.mongodb.net/test';
const secret = 'something_secret';

module.exports = {
    port: port,
    db: {
        user: dbUser,
        password: dbPassword,
        url: dbUrl
    },
    secret: secret
};