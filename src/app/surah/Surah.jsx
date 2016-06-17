/** @jsx h */
const {h, Component} = require('preact');
const {Link} = require('preact-router');
const PropTypes = require('proptypes');
const {connect} = require('preact-redux');
const {bind, debounce} = require('decko');

function convertDigitIn(enDigit){ // PERSIAN, ARABIC, URDO
    var newValue="";
    for (var i=0;i<enDigit.length;i++)
    {
        var ch=enDigit.charCodeAt(i);
        if (ch>=48 && ch<=57)
        {
            // european digit range
            var newChar=ch+1584;
            newValue=newValue+String.fromCharCode(newChar);
        }
        else
            newValue=newValue+String.fromCharCode(ch);
    }
    return newValue;
}

const styles = {
    arabic: {
        fontFamily: 'Droid Arabic Naskh',
        fontSize: 22,
        margin: 20,
        textAlign: 'right',
        lineHeight: 2
    },
    latin: {
        fontSize: 18,
        lineHeight: 1.5
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20
    }
}

class Surah extends Component {
    constructor(props, context) {
        super(props, context);
        this.state.ayah = [];
    }

    componentDidMount() {
        this.loadMore(true)
        this.context.push({
            type: 'SET_ACTIVE_SURA',
            payload: {
                sura_id: this.props.sura_id
            }
        })
        window.addEventListener('scroll', this.onScroll)
    }

    @bind
    onScroll(e) {
        if (window.innerHeight + e.srcElement.body.scrollTop === e.srcElement.body.scrollHeight) {
            this.endReached()
        }
    }

    endReached() {
        this.loadMore(false)
    }

    loadMore(firstTime) {
        const {sura_id, surahMaps, ayahIds, ayahMaps} = this.props;
        const sura = surahMaps[sura_id];
        const {offset, limit} = sura? sura.cursor : {offset: 0, limit: 20};
        this.context.push({
            type: 'LOAD_AYAH_OF_SURAH',
            payload: {
                offset: firstTime? offset : offset + 20,
                limit,
                sura_id
            }
        });
    }

    componentWillUnmount() {
        this.context.push({
            type: 'SET_ACTIVE_SURA',
            payload: {
                sura_id: "x"
            }
        })
        window.removeEventListener('scroll', this.onScroll)
    }

    render({sura_id, surahMaps, ayahIds, ayahMaps, phase}) {
        console.log(this);
        const sura = surahMaps[sura_id];
        const ayah = ayahIds.map(ayahId => ayahMaps[ayahId])
            .filter(aya => aya._sura == sura_id)
            .map(aya => {
                const isArabic = aya._language === 1;
                return (
                    <div class="uk-width-1-1">
                        <p style={isArabic? styles.arabic : styles.latin}>{isArabic? convertDigitIn(aya.verse.toString()) : aya.verse}) {aya.ayah_text}</p>
                    </div>
                )
            })
        

        return (
            <div class="uk-container">
                <h3 style={styles.title}>{sura? "" : "Loading..."}</h3>
                <div class="uk-grid">
                    {ayah.length? ayah : "Loading ayah... "}
                </div>
                <br />
                <p>{phase === "LOADING"? "Loading more..." : "Loaded"}</p>
            </div>
        )
    }
}

module.exports = connect(state => state.quran)(Surah)