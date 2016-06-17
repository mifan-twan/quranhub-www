/** @jsx h */
const {h, Component} = require('preact');
const Navbar = require('../common/Navbar');

const styles = {
    footer: {
        textAlign: 'center',
        padding: 5,
        margin: 5,
        borderTop: `1px solid #eee`
    },
    container: {
        paddingTop: 20
    }
}

class Layout extends Component {
    render() {
        console.log(this)
        return (
            <div>
                <Navbar title={this.props.title} />
                <div class="uk-container" style={styles.container}>
                    <br />
                    <br />
                    <br />
                    {this.props.children}
                </div>
                <div>
                    <p style={styles.footer}>Crafted by donnystark</p>
                </div>
            </div>
        );
    }
}

module.exports = Layout;