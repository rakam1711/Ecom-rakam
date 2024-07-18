const express = require('express');
const unspecifiedRoutesHandler = require('./unspecifiedRoute');
const { finalErrorHandler } = require('../errorHandler');
// const userRoute = require('./user.route');


const appRoutes = (app) => {
    app.get('/api/ping', (_, res) =>
        res.status(200).json({ status: true, message: `${process.env.PROJECT} Ping Successfully.`, timestamp: new Date() })
    );
    app.use('/public', express.static('public'));

    //   app.use('/api', userRoute);

    app.use(unspecifiedRoutesHandler);
    app.use(finalErrorHandler);
};

module.exports = appRoutes;

// app.use('/images', express.static('public/images'));
// app.use('/images', express.static('images'));
