/** @jsx h */
const {h, Component} = require('preact');
const {Link} = require('preact-router');
const PropTypes = require('proptypes');
const Layout = require('../common/Layout');
const {connect} = require('preact-redux');
const {debounce} = require('decko');

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
    title: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20
    }
}

class Search extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render({searchQuery, searchResults, surahMaps}) {
        console.log(this);
        const results = searchResults && searchResults.map(aya => {
            const isArabic = aya._language === 1;
            return (
                <div class="uk-width-1-1">
                    <p class={isArabic? "arab" : "latin"}>{isArabic? convertDigitIn(aya.verse.toString() + " - "+ aya._sura.toString()) : aya.verse + " - " + surahMaps[aya._sura].title}) {aya.ayah_text.replace(/&quot;/g,'"')}</p>
                </div>
            )
        })
        return (
            <div class="uk-container">
                <div class="uk-grid">
                    <p>{searchQuery.length? "Searching " + searchQuery + ".." : "Type ahead to search..."}</p>
                    <br />
                    {results}
                </div>
            </div>
        )
    }
}

module.exports = connect(state =>({...state.search, ...state.quran}))(Search)