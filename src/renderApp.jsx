/** @jsx h */
const {createStore} = require('redux');
const {createGraphqlClient, createHandlers, createActionQueue} = require('./utils');
const createSearchHandlers = require('./handlers/search');
const createQuranHandlers = require('./handlers/quran');
const {h, Component} = require('preact');
const render = require('preact-render-to-string');
const appReducer = require('./appReducer');
const App = require('./App');

const renderApp = (initialStore) => {
    const store = createStore(appReducer, initialStore, typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f);
    const graphqlClient = createGraphqlClient('http://localhost:9000/graphql');
    const searchHandler = createSearchHandlers(graphqlClient);
    const quranHandler = createQuranHandlers(graphqlClient);
    const handlers = createHandlers([searchHandler, quranHandler]);
    const push = createActionQueue(store, handlers);
    const app = (<App push={push.bind(null)} store={store} />);
    push({
        type: 'LOAD_ALL_SURAH'
    });
    const renderString = render(app);
    return renderString;
}
module.exports = renderApp;