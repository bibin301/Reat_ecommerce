import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


//Load images
import logo from '../asserts/images/logo.png';
// import bell from '../asserts/icons/Bell.svg';
import calc from '../asserts/icons/Calendar (1).svg';
import discover from '../asserts/icons/Discovery_default.svg';


class Header extends Component {

    constructor(props) {
        super(props);
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
        this.state = {

            firstLitter: sessiondata ? sessiondata.userName.substring(0, 1).toUpperCase() : "",
            sign: sessiondata ? sessiondata.userName.substring(0, 1).toUpperCase() : "",
            user: sessiondata ? sessiondata.userName : "",
        }
     
    }

    logOut = () => {
        sessionStorage.removeItem('sessionData');
        sessionStorage.removeItem('statsInfo');
        sessionStorage.removeItem('cookies');
        sessionStorage.removeItem('pinList');
    }

    getRedirection = (event) => {
        event.preventDefault();
        this.props.history.push("/discovery")
    }

    goDecks = (event) => {
        event.preventDefault();
        this.props.history.push("/dashboard")
    }

    login = (event) => {
        event.preventDefault();
        this.props.history.push("/login")
    }

    render() {


        const { firstLitter, sign, user } = this.state;
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
        return (

            <nav className="navbar navbar-default navbar-fixed-topc">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <span onClick={this.getRedirection}>  <a className="navbar-brand" ><img alt="logo" style={{ height: '70px', marginTop: '-30px' }} src={logo} /> </a> </span>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">

                            {/* <li ><a ><img style={{ height: '20px' }} src={search} /></a></li> */}
                            {sessiondata && <li onClick={this.goDecks}><a className="fontSize"><img style={{ height: '20px' }} alt="" src={calc} /> &nbsp;&nbsp;&nbsp; My decks </a></li>}
                            <li onClick={this.getRedirection} ><a className="fontSize"><img style={{ height: '20px' }} alt="" src={discover} /> &nbsp;&nbsp;&nbsp; Discovery </a></li>
                            {/* <li><a className="fontSize"><img alt="bell" style={{ height: '20px' }} src={bell} /></a></li> */}
                            {sessiondata == null && <li onClick={this.login}><a className="fontSize loginMenuBtn"> Login</a></li>}
                            {/* <li><a ><img style={{ height: '20px' }} src={view} /></a></li> */}
                            {/* <li><a  onClick={this.logout}><img style={{ height: '20px' }} src={user} /></a></li> */}
                            {sessiondata && <li className="dropdown"><a className="dropdown-toggle dropDownLiDiv dashNameBg" type="button" data-toggle="dropdown">{firstLitter}</a>
                                <ul className="dropdown-menu profileView">
                                    <li className="userNameView"><a >
                                        {/* <span className="sign">L</span> */}
                                        <span className="sign">{sign}</span>

                                        <span className="user">{user}</span>
                                    </a></li>
                                    <li><NavLink to={'/dashboard'} href="">Dashboard</NavLink></li>
                                    <li><NavLink to={'/accountSettings'} href="">Account Setting</NavLink></li>
                                    <li onClick={this.logOut}> <NavLink to={"/login"} href="" className="" >Logout</NavLink></li>
                                </ul>
                            </li>}
                            {/* discovery */}
                        </ul>

                    </div>
                </div>
            </nav>

        );

    }
}

export default Header;
