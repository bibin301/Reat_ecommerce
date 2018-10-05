import React from 'react';
import validator from 'validator'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Register, login } from '../../services/service/action';
import logo from '../../asserts/icons/logo.svg';
import Footer from '../../components/Footer';
import Notifications, { notify } from 'react-notify-toast';

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            confirmPassword: "",
            UserName: "",
            submitted: false,
            errors: {},
            Emailfalse: false,
            passwordWrong: false,
            invalidPattern: false,
            usernamelength: false,
            showPopup: false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.submitValidations = this.submitValidations.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTerms = this.handleTerms.bind(this);


        this.isEmpty = this.isEmpty.bind(this);

    }

    handleChange(e) {
        this.setState({ errors: {} });

        this.setState({ [e.target.name]: e.target.value })

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    isEmpty(obj) {
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        if (typeof obj !== "object") return true;
        for (var x in obj) {
            return false;
        }

        return true;

    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ errors: {} }); this.setState({ submitted: true });
        let errorResponse = this.submitValidations(this.state);
        if (this.isEmpty(errorResponse)) {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }

    handleTerms() {
        let data = {
            UserName: this.state.UserName,
            Email: this.state.Email,
            Password: this.state.Password
        };
        this.props.Register(data)
            .then(response => {
                let myColor = { background: '#40a562', text: "#FFFFFF" };
                notify.show("Register Successfully", "custom", 2000, myColor)
                if (response.data) {
                    if (response.data.status === 200) {
                        let data = {
                            "grant_type": "password",
                            "username": this.state.UserName,
                            "password": this.state.Password

                        }
                        this.props.login(data);

                    } else if (response.data.status === 400) {
                        this.props.history.push("/favourite")
                    } else {
                        let myColor = { background: '#40a562', text: "#FFFFFF" };
                        notify.show("Register Successfully", "custom", 2000, myColor)
                        this.props.history.push("/favourite")
                    }
                }
            }).catch((error) => {
                let err = error.response.data.ModelState

                let myColor = { background: '#e83e3e', text: "#FFFFFF" };
                notify.show(Object.values(err), "custom", 2000, myColor);
            });


    }

    componentWillReceiveProps(newProps) {
        if (newProps.credentials !== this.props.credentials) {
            if (newProps.credentials.token_type === "bearer") {
                sessionStorage.setItem('sessionData', JSON.stringify(newProps.credentials));
                this.props.history.push('/favourite');
            }
        }
    }

    submitValidations(event) {
        const { errors } = this.state;
        const self = this;
        self.setState({ errors: {} });
        if (event.UserName === '') {
            errors.UserName = 'Please enter Username';
        }

        if (event.UserName) {
            let lengthCheck = event.UserName.length >= 6;
            if (!lengthCheck) {
                errors.UserName = 'Username should be minimum of 6 characters';
                self.setState({ usernamelength: true });
            }
        }
        if (event.Password === '') {
            errors.Password = 'Please enter Password';
        }
        if (event.confirmPassword === '') {
            errors.confirmPassword = 'Please enter Confirm Password';
        }
        if (event.Email === '') {
            errors.Email = 'Please enter Confirm Password';
        }

        if (event.Email) {
            if (!(validator.isEmail(event.Email))) {
                errors.Email = 'Please Enter the valid Email ';
                this.setState({ Emailfalse: true })
            }
        }

        if (event.confirmPassword) {
            if (!validator.equals(event.confirmPassword, event.Password)) {
                errors.confirmPassword = 'Password does not Match';
                this.setState({ passwordWrong: true })
            }
        }

        if (event.Password) {
            let passwordCheck = event.Password.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/);
            let val = event.Password.length >= 8 && (passwordCheck != null);
            if (!val) {
                errors.Password = 'minimum of 8 characters,atleast 1 number, 1 lowercase,1 uppercase , and 1 symbol';
                this.setState({ invalidPattern: true })
            }
        }

        self.setState({ errors: errors });
        return errors;
    }

    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        const { submitted, errors, Emailfalse, UserName, usernamelength, Password, confirmPassword, Email, passwordWrong, invalidPattern } = this.state;

        return (
            <div className="signUpBg">
                <Notifications />
                <NavLink to={'/discovery'} href="">  <div className="logoBg">
                    <img alt="logo" src={logo} />
                    <h2 className="logoText">CryptoDecks</h2>
                </div></NavLink>
                <div className="signUpInner">
                    <h2 className="signUptext">Create new account</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group posiRel">
                            <label className="commonLabel" name="UserName"
                            >Username</label>
                            <input type="text" name="UserName" className="form-control commonInput" value={this.state.UserName} onChange={this.handleChange} />
                            {submitted && (!UserName || usernamelength) && errors.UserName &&
                                <label className="commonNotifyerror">{errors.UserName}</label>
                            }

                        </div>
                        <div className="form-group posiRel">
                            <label className="commonLabel">Password</label>
                            <input type="password" name="Password" className="form-control commonInput" value={this.state.Password} onChange={this.handleChange} />
                            {submitted && (!Password || invalidPattern) && errors.Password &&
                                <label className="commonNotifyerror" >{errors.Password}</label>
                            }

                        </div>
                        <div className="form-group posiRel">
                            <label className="commonLabel">Confirm Password </label>
                            <input type="password" name="confirmPassword" className="form-control commonInput" value={this.state.confirmPassword} onChange={this.handleChange} />
                            {submitted && (!confirmPassword || passwordWrong) && errors.confirmPassword &&
                                <label className="commonNotifyerror">{errors.confirmPassword}</label>
                            }

                        </div>
                        <div className="form-group posiRel">
                            <label className="commonLabel">Email</label>
                            <input type="text" name="Email" className="form-control commonInput" value={this.state.Email} onChange={this.handleChange} />
                            {submitted && (!Email || Emailfalse) && errors.Email &&
                                <label className="commonNotifyerror">{errors.Email}</label>
                            }


                        </div>
                        <div className="signUpBtnBg">
                            <button type="submit" className="blackGoastBtn" >Signup</button>
                            {/* <NavLink to={"/login"}>Back To Login</NavLink> */}
                        </div>
                    </form>
                </div>
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.togglePopup.bind(this)}
                        submit={this.handleTerms.bind(this)}
                    />
                    : null
                }
                {!cookies === true ? <Footer /> : ""}
            </div>
        );
    }
}
class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scroll: true
        }
        this.scrolled = this.scrolled.bind(this);
    }
    scrolled(e) {
        const bottomScroll = e.target.offsetHeight + e.target.scrollTop;
        let value = Math.trunc(bottomScroll)
        let data = e.target.scrollHeight
        let result = value == data
        if (result == true) {
            this.setState({ scroll: false })
        }
        else {
            this.setState({ scroll: true })
        }

    }
    render() {
        return (
            <div className="modal termsModal" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header termsHead">
                            <h4 className="modal-title termText">Terms & Conditions</h4>
                        </div>
                        <div className="modal-body termsBody" onScroll={this.scrolled}>
                            <h4>Introduction </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam justo lectus, rhoncus sed ex vel, faucibus hendrerit magna. Nullam volutpat congue risus, et vulputate ipsum tempor eget. Pellentesque bibendum ac ante nec consequat. Sed sollicitudin blandit elit at vehicula. Donec iaculis quam dui, in accumsan urna vestibulum iaculis. Duis nec lorem ut felis luctus auctor. Cras eu ligula pretium, faucibus quam at, malesuada purus. Phasellus ornare convallis felis, ut fringilla lorem pharetra ut.</p>

                            <h4>First chapter </h4>
                            <p> Integer quis diam at dolor auctor porta eu ac turpis. In a ligula tortor. Aliquam lectus magna, interdum blandit ultricies vitae, volutpat id dolor. Donec tempor pellentesque volutpat. Nunc aliquam odio a pellentesque pharetra. Donec a augue in sapien fringilla hendrerit. Curabitur interdum eget nisl eu tempus. Maecenas nec hendrerit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed faucibus blandit aliquet. Nam fringilla mi sit amet sollicitudin cursus.</p>

                            <h4> Second chapter </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam justo lectus, rhoncus sed ex vel, faucibus hendrerit magna. Nullam volutpat congue risus, et vulputate ipsum tempor eget. Pellentesque bibendum ac ante nec consequat. Sed sollicitudin blandit elit at vehicula. Donec iaculis quam dui, in accumsan urna vestibulum iaculis. Duis nec lorem ut felis luctus auctor. Cras eu ligula pretium, faucibus quam at, malesuada purus. Phasellus ornare convallis felis, ut fringilla lorem pharetra ut.</p>
                        </div>
                        <div className="modal-footer termsHead termsTextAlign">
                            <button type="button" className="termsBtn" onClick={this.props.submit} disabled={this.state.scroll} >Agree to terms & conditions</button>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
// export default Signup;
const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({

    Register: credentials => dispatch(Register(credentials)),
    login: credentials => dispatch(login(credentials)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);