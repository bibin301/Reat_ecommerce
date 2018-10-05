import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import queryString from 'query-string'
import { resetpassword } from '../../services/service/action';
import logo from '../../asserts/icons/logo.svg';
import tick from '../../asserts/icons/CheckTick.svg';
import Footer from '../../components/Footer';
import Loader from '../../components/loader.js'

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        //const parsed = queryString.parse(props.location.search);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            code: "",
            errors: { password: '', confirmPassword: '' },
            loader: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let passwordValid = this.state.passwordValid;

        if (fieldName === 'password') {
            fieldValidationErrors.password = value.length > 8 ? '' : 'Must contain minimum 8 character';

            if (this.state.confirmPassword !== "") {

                if (value !== this.state.confirmPassword) {
                    fieldValidationErrors.confirmPassword = 'Password does not match';
                } else {
                    fieldValidationErrors.confirmPassword = '';
                }
            }
        } else if (fieldName === 'confirmPassword') {
            if (value !== this.state.password) {
                fieldValidationErrors.confirmPassword = 'Password does not match';
            } else {
                fieldValidationErrors.confirmPassword = '';

            }
        }

        this.setState({
            errors: fieldValidationErrors,
            confirmPasswordValid: confirmPasswordValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.credentials !== this.props.credentials) {
            if (newProps.credentials.token_type === "bearer") {
                sessionStorage.setItem('sessionData', JSON.stringify(newProps.credentials));
                this.props.history.push('/login');
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({loader:true});
        let data = {
            email: "prakash1@yopmail.com",
            password: this.state.password,
            code: "fH6rQJwGTGFJOjSwmCPQxJi5txWPDKp6ABBQMSa7SnujQi8b9Nx6fgGSup0mdYhlQFo3DogQORg0L8pgImMtSiDnQxGOy0GYgzpYaH2Y4YmCiuMNmYRKrr%2fkZQzpFZgVwo87lbOC1Dr%2fxZfPdd49QC8OIoPjFevCNtHyJ1hgR9InFmr%2bL2fWeX9%2fAPxTQCjnlFS35Z6uOwcZsC62sbTq%2bw%3d%3d"
        }
        this.props.resetpassword(data).then(response=>{
            this.setState({loader:false});
        })
    }
    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))

        return (
            <div>
                <div className="signUpBg">
                    <NavLink to={'/discovery'} href="">  <div className="logoBg">
                        <img alt="logo" src={logo} />
                        <h2 className="logoText">CryptoDecks</h2>
                    </div></NavLink>
                    <div className="signUpInner">
                        <h2 className="signUptext">Set new password</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group posiRel">
                                <label className="commonLabel">New password</label>
                                <input type="password" name="password" className="form-control commonInput" value={this.state.password} onChange={this.handleChange} />{this.state.password && !this.state.errors.password ? <span className="errorsuccess"><img alt="tick" src={tick} /></span> : ""}

                            </div>
                            <div className="form-group posiRel">
                                <label className="commonLabel">Confirm new password</label>
                                <input type="password" name="confirmPassword" className="form-control commonInput" value={this.state.confirmPassword} onChange={this.handleChange} />{this.state.confirmPassword && !this.state.errors.confirmPassword && this.state.password === this.state.confirmPassword
                                    ? <span className="errorsuccess"><img alt="tick" src={tick} /></span> : ""}

                            </div>
                            <div className="signUpBtnBg ">
                                <button type="submit" className="blackGoastBtn" disabled={this.state.password === "" || this.state.confirmPassword === ""} >ResetPassword</button>
                                {/* <NavLink to={"/Login"} href="" className="forgotLink">Back To Login</NavLink> */}
                            </div>
                        </form>
                    </div>
                </div>
                {<Loader data={this.state.loader} />}

                {!cookies === true ? <Footer /> : ""}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    resetpassword: credentials => dispatch(resetpassword(credentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);