/** @jsx h */
const {h, Component} = require('preact');
const {Link} = require('preact-router');
const PropTypes = require('proptypes');
const Layout = require('../common/Layout');
const {connect} = require('preact-redux');

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render({surahIds, surahMaps}) {
        console.log(this)

        const surah = surahIds.map(suraId => surahMaps[suraId])
            .map(sura => {
                return (
                    <div class="uk-width-1-2">
                        <Link href={`/sura/${sura._id}`}>{sura.title}</Link>
                    </div>
                )
            })
        return (
            <div class="uk-container">
                <div class="uk-grid">
                    {surah.length? surah : "Loading..."}
                </div>
            </div>
        )
    }
}

module.exports = connect(state => state.quran)(Home)