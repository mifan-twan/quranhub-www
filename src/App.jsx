"use strict";
/** @jsx h */

const {h, Component} = require('preact');
const Router = require('preact-router');
const {Provider} = require('preact-redux');

const Home = require('./app/home/Home');
const Surah = require('./app/surah/Surah');
const Search = require('./app/search/Search');
const About = require('./app/about/About');
const Layout = require('./app/common/Layout');

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }

    getChildContext() {
        return this.props;
    }

    render({store, push}) {
        console.log(this)
        return (
            <Layout>
                <Router history={false}>
                    <Home path="/" />
                    <Surah path="/sura/:sura_id" />
                    <Search path="/search" />
                    <About path="/about" />
                </Router>
            </Layout>
        )
    }
}

module.exports = App;