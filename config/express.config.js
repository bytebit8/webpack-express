const productPort = { port: 8080 };

module.exports = {

    productName: 'webpack-express',

    port: productPort.port || 8080,

    session: {
        secret: '12345',
        cookie: { maxAge: 1800000, path: '/' },
        resave: false,
        saveUninitialized: true
    },

    locals: {}

}
