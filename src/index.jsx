const {createStore} = require('redux');
const Promise = require('promise');
const request = require('superagent');
const createSearchHandlers = require('./handlers/search');
const createQuranHandlers = require('./handlers/quran');
const {h, Component, render} = require('preact');
const {createGraphqlClient, createHandlers, createActionQueue} = require('./utils');
const appReducer = require('./appReducer');

const isProd = process.env.NODE_ENV === "production";

let root;
const startUserInterfaceLayer = (target) => {
    const store = createStore(appReducer, {}, typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f);
    const App = require('./App');
    const graphqlClient = createGraphqlClient(isProd? '/graphql' :'http://localhost:9000/graphql');
    const searchHandler = createSearchHandlers(graphqlClient);
    const quranHandler = createQuranHandlers(graphqlClient);
    const handlers = createHandlers([searchHandler, quranHandler]);
    const push = createActionQueue(store, handlers);
    const app = (<App push={push.bind(null)} store={store} />);
    push({
        type: 'LOAD_ALL_SURAH'
    })
    root = render(app, target, root);
}

startUserInterfaceLayer(document.body);

if (module.hot) {
    module.hot.accept('./App', () => requestAnimationFrame( () => {
        flushLogs();
        startUserInterfaceLayer(document.body);
    }) );

    // optional: mute HMR/WDS logs
    let log = console.log,
        logs = [];
    console.log = (t, ...args) => {
        if (typeof t==='string' && t.match(/^\[(HMR|WDS)\]/)) {
            if (t.match(/(up to date|err)/i)) logs.push(t.replace(/^.*?\]\s*/m,''), ...args);
        }
        else {
            log.call(console, t, ...args);
        }
    };
    let flushLogs = () => console.log(`%c🚀 ${logs.splice(0,logs.length).join(' ')}`, 'color:#888;');
}
