import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3000;

const app = express();

// serve static assets
app.use(express.static('./build'));

// for any other requests, send `index.html` as a response
app.use( '*', ( req, res ) => {

    // read `index.html` file
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../build/index.html' ), {
        encoding: 'utf8',
    } );

    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString(<App/>);

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace( '<div id="root"></div>', `<div id="root">${ appHTML }</div>` );


    // set header and status
    res.contentType('text/html');
    res.status(200);

    return res.send(indexHTML);
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});