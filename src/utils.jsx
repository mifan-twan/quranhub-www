/** @jsx h */
const Promise = require('promise');
const request = require('superagent');
const createHandlers = (handlers) => {
    return handlers.reduce((prevHandlers, currenthandlers) => ({...prevHandlers, ...currenthandlers}), {});
}

const createActionQueue = (store, handlers) => {
    const _store = store;
    return (action) => {
        const {type, payload} = action;
        const handler = handlers[type];

        if (!handler) {
            store.dispatch(action);
            return;
        }

        store.dispatch({
            type: type + "_START",
            payload
        });

        handler(payload, store.getState())
            .then(successPayload => {
                store.dispatch({
                    type: type + "_SUCCESS",
                    payload: successPayload
                });
            })
            .catch(error => {
                store.dispatch({
                    type: type + "_FAIL",
                    payload: {
                        error: error.message
                    }
                });
                console.log(error)
            })
    }
}

const createGraphqlClient = (endpoint) => {
    return (query) => {
        return new Promise((resolve, reject) => {
            request.post(endpoint)
                .send({query})
                .end((err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response.body);
                    }
                })
        });
    }
}


exports.createHandlers = createHandlers;
exports.createActionQueue = createActionQueue;
exports.createGraphqlClient = createGraphqlClient;
