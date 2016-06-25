/** @jsx h */
const {h, Component} = require('preact');
const {Link} = require('preact-router');
const PropTypes = require('proptypes');
const Layout = require('../common/Layout');
const {connect} = require('preact-redux');
const colorHash = new (require('color-hash'))({ saturation: 0.05 });

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render({surahIds, surahMaps}) {
        console.log(this)

        const surah = surahIds.map(suraId => surahMaps[suraId])
            .map(sura => {
                return (
                    <div class="uk-width-small-1-2 uk-width-medium-1-4" style={{ textAlign: 'center', marginBottom: 10 }}>
                        <Link style={{ color: colorHash.hex(sura.title), fontSize: 20 }} href={`/sura/${sura._id}`}>{sura._id}) {sura.title}</Link>
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