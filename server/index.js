let express = require('express');

const PORT = process.env.PORT || 3000;
const fs = require("fs");
const path = require('path');
const app = express();
const router = express.Router();
const axios = require("axios");


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
        const preloadedState = store.getState();
        axios
            .get("https://hn.algolia.com/api/v1/search?page="+(req.query.page ? (Number(req.query.page)-1) : 0))
            .then(ax_resp => {
                preloadedState['feedReducer']['pageFeed'] = ax_resp.data.hits;

                const html = ReactDOMServer.renderToString(<Provider store={store}><App /></Provider>);
                return res.send(
                    htmlData.replace(
                        '<div id="root"></div>',
                        `<div id="root">${html}</div>
                        <script>
                          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
                        </script>`
                    )
                );
            })
            .catch(err => {
                console.log(err);
                res.status(503).send("Internal Server Error");
            })

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