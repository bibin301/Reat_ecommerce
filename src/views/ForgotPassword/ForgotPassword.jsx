import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../services/service/action';
import logo from '../../asserts/icons/logo.svg';
import tick from '../../asserts/icons/CheckTick.svg'
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { API_BASE_URL } from '../../constants/apiUrl';
import Footer from '../../components/Footer';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../../components/loader.js'
class ForgotPassword extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            loader:false,
            email:'',
            data:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(e)
    {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(event)
    {
        event.preventDefault();
        axios.post(API_BASE_URL+"/user/Exists?username="+this.state.email)
        .then(res => {
            this.setState({data:res})
      })
     this.setState({loader:true})
        this.props.forgotPassword(this.state.email).then(response=>{
            this.setState({loader:false})
            if (response.data.IsError ==false)
            {
                let myColor = { background: '#40a562', text: "#FFFFFF" };   
                notify.show(response.data.Message, "custom", 1000, myColor)
            }else
            {
                let myColor = { background: '#e83e3e', text: "#FFFFFF" };   
                notify.show(response.data.Message, "custom", 1000, myColor)
            }
        })    
    }

    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
      
        return (
            <div>
                {this.props.email && <Notifications />}
                <div className="signUpBg">
                    <div className="logoBg">
                        <img alt="logo" src={logo} />
                        <h2 className="logoText">CryptoDecks</h2>
                    </div>
                    <div className="signUpInner">
                        <h2 className="signUptext">ResetPassword</h2>
                        <form onSubmit={this.handleSubmit}> 
                            <div className="form-group posiRel">
                            <label className="commonLabel">Registered Email</label>
                                <input type="email" name="email" className="form-control commonInput" value={this.state.email} onChange={this.handleChange}/>
                                {!this.props.email.IsError&& this.state.email ? <span className="errorsuccess"><img alt="tick" src={tick} /></span> : ""}
                                
                                {this.props.email.IsError  ?  <label className="commonNotifyerror">Email has not yet Registered Go to signup to create an account</label> : ""}
                                {!this.props.email.IsError && this.state.email ? <label className="commonNotifysuccess">Check your Email and Follow the instructions</label> : ""}

                            </div>
                            <div className="signUpBtnBg ">
                                <button type="submit" className="blackGoastBtn">Send a ResetPassword Link</button>
                            <NavLink to={"/Login"} href="" className="forgotLink commonLink">Back To Login</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
                {<Loader data={this.state.loader}/>}
                 { !cookies === true ?<Footer/>:""}
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    email:state.service.email,
});
const mapDispatchToProps=dispatch=>({
    forgotPassword:email=>dispatch(forgotPassword(email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);