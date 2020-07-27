let express = require('express');

const PORT = process.env.port || 3000;
const fs = require("fs");
const path = require('path');
const app = express();
const router = express.Router();



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux';

import configureStore from '../src/store';
import App from '../src/App';

// router.use(express.static(path.join(__dirname, '..', 'build')));

router.use('^/$', (req, res) => {
	const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }
        const store = configureStore();

        const html = ReactDOMServer.renderToString(<Provider store={store}><App /></Provider>);

        // inject the rendered app into our html and send it
        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    });
});

router.use(express.static(path.join(__dirname, '..', 'build')));

app.use(router);

app.listen(PORT, (error) => {
    if (error) {
        return console.log('something bad happened', error);
    }

    console.log("listening on " + PORT + "...");
});