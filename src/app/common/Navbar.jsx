/** @jsx h */
const {h, Component} = require('preact');
const {connect} = require('preact-redux');
const {route, Link} = require('preact-router');
const {bind, debounce} = require('decko');

const styles = {
    navbar: {
        backgroundColor: '#fff',
        position: 'fixed',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        display: 'block',
        position: 'absolute',
        width: '100%',
        zIndex: -10
    }
}


class Navbar extends Component {
    @bind
    @debounce(1000)
    handleSearch(e) {
        this.context.push({
            type: 'SEARCH_QUERY',
            payload: {
                query: e.target.value
            }
        })
    }

    @bind
    redirectToSearch(e) {
        if (this.props.path !== "/search") {
            route('/search', false);
        }
    }

    render({searchQuery, surahMaps, activeSuraId}) {
        console.log(this)
        const sura = surahMaps[activeSuraId]
        return (
            <nav class="uk-navbar" style={styles.navbar}>
                <Link class="uk-navbar-brand" href="/">Quran Hub</Link>
                <div style={styles.title} class="uk-navbar-content">
                    <span>{sura && sura.title}</span>
                </div>
                <div class="uk-navbar-content uk-navbar-flip  uk-hidden-small">
                    <form class="uk-form uk-margin-remove uk-display-inline-block">
                        <input onFocus={this.redirectToSearch} onKeyUp={this.handleSearch} type="text" placeholder="Search"/>
                    </form>
                </div>
            </nav>
        )
    }
}

module.exports = connect(state => ({...state.search, ...state.quran}))(Navbar);