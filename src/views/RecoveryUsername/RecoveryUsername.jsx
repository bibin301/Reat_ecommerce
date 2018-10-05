import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { recoveryusername } from '../../services/service/action';

import Footer from '../../components/Footer';

import logo from '../../asserts/icons/logo.svg';
import tick from '../../asserts/icons/CheckTick.svg'

import Loader from  '../../components/loader.js'
import Notifications, { notify } from 'react-notify-toast';


class RecoveryUsername extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            data: false,
            loader:false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        this.setState({loader:true})
        e.preventDefault();
        this.props.recoveryusername(this.state.email)
            .then(response => {
                this.setState({ loader: false })

                if (response.data.IsError == false) {
                    let myColor = { background: '#40a562', text: "#FFFFFF" };
                    notify.show(response.data.Message, "custom", 1000, myColor)
                } else {
                    let myColor = { background: '#e83e3e', text: "#FFFFFF" };
                    notify.show(response.data.Message, "custom", 1000, myColor)
                }
            })   
        axios.post("https://cryptodesksapi.azurewebsites.net/api/user/Exists?username=" + this.state.email)
            .then(res => {
                this.setState({ data: res })
            })
    }
    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))

        return (
            <div>
                {this.props.email && <Notifications />}
                <div className="signUpBg">
                    <NavLink to={'/discovery'} href="">  <div className="logoBg">
                        <img alt="logo" src={logo} />
                        <h2 className="logoText">CryptoDecks</h2>
                    </div></NavLink>
                    <div className="signUpInner">
                        <h2 className="signUptext">Recover username</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group posiRel">
                                <label className="commonLabel">Registered Email</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control commonInput" />{!this.props.email.IsError && this.state.email ? <span className="errorsuccess"><img alt="" src={tick} /></span> : ""}
                                
                                {this.props.email.IsError ? <label className="commonNotifyerror">Email has not yet Registered Go to signup to create an account</label> : ""}
                                {!this.props.email.IsError && this.state.email ? <label className="commonNotifysuccess">Check your Email and Follow the instructions</label> : ""}

                            </div>
                            <div className="signUpBtnBg ">
                                <button type="submit" className="blackGoastBtn" disabled={this.state.email === ""} >Send a Recovery Link</button>
                                <NavLink to={"/Login"} href="" className="forgotLink commonLink">Back To Login</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
                {<Loader data={this.state.loader}/>}
                {!cookies === true ? <Footer /> : ""}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    email: state.service.email,
});
const mapDispatchToProps = dispatch => ({
    recoveryusername: email => dispatch(recoveryusername(email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RecoveryUsername);