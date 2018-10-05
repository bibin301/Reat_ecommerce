import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { login } from '../../services/service/action';
import checked from '../../asserts/icons/CheckTick.svg';
import logo from '../../asserts/icons/logo.svg';
import Footer from '../../components/Footer';
import Notifications, { notify } from 'react-notify-toast';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorResponse: '',
            errors: { username: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillReceiveProps(newProps) {
        if (newProps.credentials !== this.props.credentials) {
            if (newProps.credentials.token_type === "bearer") {
                sessionStorage.setItem('sessionData', JSON.stringify(newProps.credentials));
                this.props.history.push('/discovery');
            }
        }
    }


    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'username':
                emailValid = value.length >= 6;
                fieldValidationErrors.username = emailValid ? '' : ' Please enter valid email id';
                break;
            case 'password':
                passwordValid = value.length >= 8;
                fieldValidationErrors.password = passwordValid ? '' : 'Must contain minimum 8 characters';
                break;
            default:
                break;
        }

        this.setState({
            errors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }
    handleSubmit(event) {
        event.preventDefault()
        let data = {
            "grant_type": "password",
            "username": this.state.username,
            "password": this.state.password

        }
        this.props.login(data).then(response=>{
            let myColor = { background: '#40a562', text: "#FFFFFF" };
            notify.show("Login Successfully", "custom", 2000, myColor)
        }).catch((error) => {
            if (error.response){
            let myColor = { background: '#e83e3e', text: "#FFFFFF" };
            notify.show(error.response.data.error_description, "custom", 2000, myColor)
            }

        });
    }

    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        return (
            <div className="signUpBg">
                <Notifications />

                <NavLink to={'/discovery'} href="">  <div className="logoBg">
                    <img alt="logo" src={logo} />
                    <h2 className="logoText">CryptoDecks</h2>
                </div></NavLink>
                <div className="signUpInner">
                    <h2 className="signUptext">Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group posiRel">
                        <label className="commonLabel">Username</label>
                            <input type="text" className="form-control commonInput" name="username" value={this.state.username} onChange={this.handleChange} />{this.state.emailValid ? <span className="errorsuccess"><img alt="check" src={checked} /></span> : ""}
                          

                        </div>
                        <div className="form-group posiRel">
                        <label className="commonLabel">Password</label>
                            <input type="password" className="form-control commonInput" name="password" value={this.state.password} onChange={this.handleChange} />{this.state.passwordValid ? <span className="errorsuccess"><img alt="check" src={checked} /></span> : ""}
                            

                        </div>

                        <div className="signUpBtnBg ">
                            <button type="submit" className="blackGoastBtn" disabled={!this.state.formValid}>Login</button>
                            <NavLink to={"/recoveryusername"} href="" className="forgotLink commonLink">Forgot Username</NavLink>
                            <NavLink to={"/forgotpassword"} href="" className="forgotLink commonLink">0r Password</NavLink>

                        </div>
                    </form>
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
    login: credentials => dispatch(login(credentials)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);