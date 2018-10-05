import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { accountSettings, getAccountUserInfo, subscribeUser } from '../../services/service/action';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class AccountSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            successMessage: false,
            isUpdate: false,
            isOldPassword: false,
            isNewPassword: false,
            changePassword: false,
            isSuccessMessage: false,
            isUpdateButton: true,
            subscribeChecked: true,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            errors: { newPassword: '', confirmPassword: '' },

        }
        // this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentDidMount() {
        this.props.getAccountUserInfo();
    }

    handleClick() {
        this.setState({ changePassword: !this.state.changePassword })
    }
    handleChange(e) {

        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let passwordValid = this.state.passwordValid;

        if (fieldName === 'newPassword') {
            fieldValidationErrors.newPassword = value.length >= 8 && value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/) ? '' : 'Must contain minimum 8 character 1 uppercase & lowercase';

            if (value !== this.state.newPassword) {
                fieldValidationErrors.newPassword = 'error';
            }

        }

        this.setState({
            errors: fieldValidationErrors,
            confirmPasswordValid: confirmPasswordValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
  

    //added new function
    getSubscribe = () => {

        this.setState({
            subscribeChecked: !this.state.subscribeChecked
        })
       
        if(this.state.subscribeChecked === true){
            this.props.subscribeUser();
        }
        

    }

    showUpdate = () => {
        this.setState({ isUpdate: true })
    }

    submitOldPassword = () => {
        this.setState({ isUpdate: false, isNewPassword: true })

    }

    submitNewPassword = () => {
        const { oldPassword, newPassword } = this.state;

        const data = {
            "OldPassword": oldPassword,
            "NewPassword": newPassword,
            "ConfirmPassword": newPassword

        }

        this.props.accountSettings(data);
        // this.setState({ successMessage: !this.state.successMessage })


        this.setState({ isNewPassword: false, isSuccessMessage: true, isUpdateButton: false })
    }
    //end
    render() {

        let sessionData = JSON.parse(sessionStorage.getItem("sessionData"))

        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        const { isUpdate, isNewPassword, isSuccessMessage, isUpdateButton } = this.state;
        const { emailInfo } = this.props

        return (
            <div className="container-fluid">
                <Header {...this.props} />
                <div className="container">
                    <div className="col-md-12 margintpDn">
                        <span className="my-account">Account Setting </span><NavLink to={'/dashboard'} href=""><button className="grayGoastBtn smallBtn">Back to dashboard</button></NavLink>
                    </div>

                    <div className="col-md-12">
                        <div className="leftCalDiv"><span className="chart"><svg width="18px" height="18px" viewBox="0 0 12 11" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Vs-j-1" transform="translate(-617.000000, -444.000000)" fill="#000000"><g id="deck" transform="translate(0.000000, 233.000000)"><g id="card/standard/sharing" transform="translate(561.000000, 1.000000)"><path d="M58.630762,217.762674 C58.726392,217.762674 58.822647,217.724942 58.8957758,217.650116 L61.6909214,214.790116 C61.7890515,214.689709 61.9478098,214.689709 62.0453149,214.790116 L63.00724,215.77436 C63.3841346,216.16064 64.0435439,216.16064 64.4210636,215.77436 L66.9868222,213.14843 L66.9868222,214.380814 C66.9868222,214.59314 67.154956,214.765174 67.3618418,214.765174 C67.5687275,214.765174 67.7362363,214.59314 67.7362363,214.380814 L67.7362363,212.222384 C67.7362363,212.1725 67.7268608,212.123256 67.7074848,212.07593 C67.6693578,211.981919 67.596854,211.907093 67.5043492,211.868721 C67.4587218,211.848895 67.4105943,211.838663 67.3618418,211.838663 L65.2523569,211.838663 C65.0454711,211.838663 64.8773374,212.010698 64.8773374,212.222384 C64.8773374,212.434709 65.0454711,212.606105 65.2523569,212.606105 L66.4567946,212.606105 L63.891036,215.231395 C63.7935309,215.331163 63.6347726,215.331163 63.5372676,215.231395 L62.5753425,214.247151 C62.1853222,213.848081 61.5509141,213.848081 61.1615188,214.247151 L58.3657482,217.107791 C58.2194906,217.257442 58.2194906,217.500465 58.3657482,217.650116 C58.438877,217.724942 58.535132,217.762674 58.630762,217.762674 M68,220.616279 C68,220.828605 67.8324913,221 67.6256055,221 L57.0000521,221 C56.4487734,221 56,220.541453 56,219.976744 L56,210.383721 C56,210.172035 56.1681338,210 56.3750195,210 C56.5819053,210 56.749414,210.172035 56.749414,210.383721 L56.749414,219.976744 C56.749414,220.118081 56.8619199,220.232558 57.0000521,220.232558 L67.6256055,220.232558 C67.8324913,220.232558 68,220.404593 68,220.616279" id="Chart"></path></g></g></g></g></svg></span>
                            <span className="deckName">Profile</span>
                            {/* <button className="blackGoastBtn smallBtn">Edit</button> */}
                        </div>
                    </div>

                 
                        <div className="col-md-12 marginTop backClr">
                            <div className="col-md-6">

                                <label className="accSetLab">Username </label>
                            </div>
                            <div className="col-md-6">
                                {/* <input type="text" className="commonInput" name="" value= /> */}
                                <label className="accSetLab">{sessionData.userName}</label>
                                <p className="accSetp">This is an alias you have chosen for signin to your CryptoDecks account. Username is your identity only on CryptoDecks and independent from your other identities such as private and public key to your wallet.</p>
                            </div>
                        </div>
                        <div className="col-md-12 marginTop backClr">
                            <div className="col-md-6">

                                <label className="accSetLab">Password </label>
                            </div>
                            <div className="col-md-6">
                                {isUpdateButton && <button className="blackGoastBtn smallBtn margintpDn" type="button" onClick={this.showUpdate} > Update password</button>}
                                {/* old password */}
                                {isUpdate && <div className="form-group posiRel">
                                    <label className="accSetLab">Old password</label>
                                    <div className="">
                                        <input type="password" className="commonInput" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange.bind(this)} placeholder="Enter your old password" />
                                        <button className="blackGoastBtn smallBtn enterBtnSty" type="button" onClick={this.submitOldPassword}> Enter</button>
                                    </div>
                                    <label className="commonNotifyerror" ></label>

                                </div>}

                                {/* new password */}

                                {isNewPassword && <div className="form-group posiRel">
                                    <label className="accSetLab">New password</label>
                                    <div className="">
                                        <input type="password" className="commonInput" name="newPassword" value={this.state.newPassword} onChange={this.handleChange.bind(this)} placeholder="Enter your new password" />
                                        <button className="blackGoastBtn smallBtn enterBtnSty" type="submit" onClick={this.submitNewPassword}> Enter</button>
                                    </div>
                                    {/* <label className="commonNotifyerror" >error</label> */}
                                    {this.state.errors.newPassword &&
                                        <label className="commonNotifyerror" >{this.state.errors.newPassword}</label>
                                    }
                                </div>}

                                {/* successfully */}
                                {isSuccessMessage && <div>
                                    <span className="accSelSuccess margintpDn">Successfully updated password!</span>
                                    <p className="accSetp">We recommend you to update your password once every month. Currently, we do not allow buy/sell activity on our platform with your Beta account that associate with this password. </p>
                                </div>}
                            </div>
                        </div>
                        <div className="col-md-12 marginTop backClr">
                            <div className="col-md-6">

                                <label className="accSetLab">Email </label>
                            </div>
                            <div className="col-md-6">emailInfo
                                {/* <label className="accSetLab">{sessionData.userName + "@gmail.com"}</label> */}
                                <span> </span><label className="accSetLab">{emailInfo.Email}</label>
                                <p className="accSetp">You can use this email to sign in to your CryptoDecks account. Also, this address is where you receive information such as updates, new features from us.  </p>
                                <div className=""><form><input id="demo_box_2" value={this.state.subscribeChecked} onChange={this.getSubscribe} className="css-checkbox" type="checkbox" />
                                    <label htmlFor="demo_box_2" name="demo_lbl_2" className="css-label">Unsubscribe me from CryptoDecks newsletter</label></form></div>
                            </div>
                        </div>
            

                </div>
                {!cookies === true ? <Footer /> : ""}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
    emailInfo: state.service.emailInfo
});
const mapDispatchToProps = dispatch => ({
    accountSettings: credentials => dispatch(accountSettings(credentials)),
    getAccountUserInfo: () => dispatch(getAccountUserInfo()),
    subscribeUser: () => dispatch(subscribeUser())


});
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);