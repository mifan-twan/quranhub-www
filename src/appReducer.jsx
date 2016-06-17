/** @jsx h */
const {combineReducers, createStore} = require('redux');
const update = require('react-addons-update');
const quran = require('./reducers/quran');
const search = require('./reducers/search');

const appReducer = combineReducers({
    quran,
    search
});
module.exports = appReducer;