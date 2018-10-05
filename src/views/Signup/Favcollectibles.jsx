import React from 'react';
import { connect } from 'react-redux';
import { getFavlist, cartoonColorpick } from '../../services/service/action';
import Footer from '../../components/Footer'
import logo from '../../asserts/icons/logo.svg';
import Notifications from 'react-notify-toast';

class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBanners: [],
            selectedimageurl: [],
            imageBanners: [],
        }

    }

    componentDidMount() {
        this.props.getFavlist(null)
            .then(response => {
                this.setState({ imageBanners: response.data.data })
            })

    }

    buildDeck = (e) => {
        this.props.history.push("/discovery")
        sessionStorage.setItem('bannerlist', JSON.stringify(this.state.selectedBanners));

    }


    cartoonClick = (value) => {

        this.props.cartoonColorpick(value.address);
        if (this.props.credentials.status === 200) {
            let selectedBanners = this.state.selectedBanners
            let selectedimageurl = this.state.selectedimageurl
           
            if (selectedBanners.push(value.address) && selectedimageurl.push(value.image_url)) {
                this.setState({ selectedBanners })
                this.setState({ selectedimageurl })

            }
        }
    }

    render() {
        const { imageBanners } = this.state;
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        return (
            <div className="signUpBg">
                <Notifications/>
                <div className="logoBg">
                    <img alt="logo" src={logo} />
                    <h2 className="logoText">CryptoDecks</h2>
                </div>
                <div className="signUpInner favWidth">
                    <h2 className="signUptext">Pick 3 most favourite crypto collectibles</h2>
                    <div className="favListShowDiv" >
                        {imageBanners.map((each, i) =>
                            <div className="bannerDiv" key={i}>
                                <input type="checkbox" name="Banner1" id={"tonnarelli" + i} onClick={() => this.cartoonClick(each)} className="checkbox-input" />
                                <label htmlFor={"tonnarelli" + i} className="checkbox-label">
                                    <div className="checkbox-text">
                                        <img alt="" src={each.image_url} />
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="text-center"><button onClick={() => this.buildDeck()} type="button" className="termsBtn" disabled={this.state.selectedBanners.length < 3}>Start Building Deck</button></div>
                </div>
                 { !cookies === true ?<Footer/>:""}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    getFavlist: credentials => dispatch(getFavlist(getFavlist)),
    cartoonColorpick: credentials => dispatch(cartoonColorpick(credentials)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);