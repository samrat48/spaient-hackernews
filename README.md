Stack used is derived from Create Reat App

UI: React
Store Management: Redux with Thunk
Design: React Bootstrap, canvasjs (Charts)

Backend For serving UI
Express

Server Side Rendering:
React Dom Server
with baabel presets and plugins:
	plugin-proposal-class-properties
	plugin-transform-arrow-functions
	preset-env
	preset-react
	babel-plugin-transform-import-css

CI: Travis CI

Cloud: Heroku


Approach:
App has been created over create react app, with redux & thunk, axios used as library for API integration. and boostrap has beed used to help designing UI faster. Browser's localstorage has been used for storing human interaction.
Then created React Dom Server's rederToString to render react to its dom elements.
As I also used localstorage and windows element, so checked if backend then prevented default action from localstograge and wondows object.
I haven't used Router, as we only had single route.
Also for server side rendering, didn't used isomorphic fetch, as we only had single API to hit, I have used axios before rendering and passed data to initial state to get list of news get rendered.

Travis has been setup to deploy the app on heroku, heroku is not directly bind to github. Travis is hooked with github, on new commit push it will start the process (without branch filter). API key of heroku supplied to travis to deploy it on heroku.