import React from 'react';
import { NavLink } from 'react-router-dom'

import Footer from '../../components/Footer';
import logo from '../../asserts/icons/logo.svg';
import discover from '../../asserts/icons/Discovery_default.svg';

class LandingPage extends React.Component {

    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        let sessiondata = JSON.parse(sessionStorage.getItem("sessionData"));

        if (sessiondata !== null) {
          this.props.history.push('/discovery');
        }

        return (

            <div className="signUpBg">

                <div className="logoBg">
                    <NavLink to={'/discovery'}> <img alt="logo" src={logo} />
                        <h2 className="logoText">CryptoDecks</h2> </NavLink>

                    <ul className="nav navbar-nav navbar-right landingIn">
                        <li>  <NavLink to={"/discovery"} className="fontSize"><img style={{ height: '20px' }} alt="" src={discover} /> &nbsp;&nbsp;&nbsp; Discovery </NavLink></li>
                        <li> <NavLink to={"/login"} className="fontSize loginMenuBtn">Login</NavLink></li>
                    </ul>

                </div>

                <div className="signUpInner">

                    <div className="signUpBtnBg">
                        <h1 className="landingH1">Dicovery, pin,keep track of crypo goods</h1>
                        <p className="landingP">Organise NFTs and blockchain game items in decks,keep track of them all - both the ones you already own and those in your wishlist</p>
                        <NavLink to={'/signup'}> <button type="submit" className="blackGoastBtn marginTop10">Get early access</button></NavLink>
                    </div>
                </div>
                {!cookies === true ? <Footer /> : ""}
            </div>

        );

    }
}
export default LandingPage;
