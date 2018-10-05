import React,{Fragment} from 'react';
import { connect } from 'react-redux';
import { createnewdeck } from './../services/service/action';

import fb from './../asserts/images/facebook.png';
import twit from './../asserts/images/twitter.png';
import user from './../asserts/images/user.png';

import { FacebookShareButton, TwitterShareButton } from 'react-share';
class SocialShareedit extends React.Component {

    constructor(props) {

        super(props)
        let statsInfo = JSON.parse(sessionStorage.getItem('statsInfo'));
        this.state = {
            closePopup: true,
            payload: {},
            params: "",
            statusList: statsInfo,

        }
    }


    closePopup = (e) => {
        e.preventDefault();
        this.setState({ closePopup: !this.state.closePopup })
    }

    render() {
        const {  payload } = this.props;
     
        const shareUrl = "https://cryptodesksapi.azurewebsites.net/editSocialDetails?address=" + payload.asset_contract.address + "&token=" + payload.token_id
        return (
            <Fragment>
                {this.state.closePopup &&
            <div className="modal fade in" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog">
                    <div className="modal-content popupCont sharePopCont">
                        <div className="modal-body">
                                <button type="button" className="close popupClose" data-dismiss="modal" onClick={(e) => this.closePopup(e)} >&times;</button>
                            <div className="col-md-6">
                                <h2 className="cool-bots">Cool-bot</h2>
                                <p className="cool-botsp">Bots are awesome</p>
                            </div>
                            <div className="col-md-6">
                                <div className="shareIconsShow"><ul><li><span>
                                    <svg width="15px" height="9px" viewBox="0 0 15 9" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Vs-j-1" transform="translate(-620.000000, -492.000000)" fill="#000000"><g id="deck" transform="translate(0.000000, 233.000000)"><g id="card/standard/sharing" transform="translate(561.000000, 1.000000)"><g id="Visible-Copy" transform="translate(59.000000, 258.000000)"><path d="M7.52041298,6.06443392 C6.68206303,6.06443392 5.99959674,5.38466512 5.99959674,4.5496288 C5.99959674,3.71459248 6.68206303,3.03482368 7.52041298,3.03482368 C8.35876294,3.03482368 9.04122923,3.71459248 9.04122923,4.5496288 C9.04122923,5.38466512 8.35876294,6.06443392 7.52041298,6.06443392 M7.52041298,2.27742112 C6.26257121,2.27742112 5.23918861,3.29675873 5.23918861,4.5496288 C5.23918861,5.80249887 6.26257121,6.82183648 7.52041298,6.82183648 C8.77825476,6.82183648 9.80163736,5.80249887 9.80163736,4.5496288 C9.80163736,3.29675873 8.77825476,2.27742112 7.52041298,2.27742112 M14.075131,4.67964957 C12.6303556,6.91083128 10.1805741,8.24259744 7.52041298,8.24259744 C4.8602519,8.24259744 2.41047039,6.91083128 0.966328626,4.67964957 C0.915634751,4.60201581 0.915634751,4.49724179 0.966328626,4.41960803 C2.41047039,2.18842632 4.8602519,0.857291326 7.52041298,0.857291326 C10.1805741,0.857291326 12.6303556,2.18842632 14.075131,4.4202392 C14.1251912,4.49787296 14.1251912,4.60201581 14.075131,4.67964957 M14.7138738,4.00934831 C13.1296902,1.56104454 10.4397465,0.0992575986 7.52041298,0.0992575986 C4.60107946,0.0992575986 1.91176939,1.56104454 0.326952128,4.00934831 C0.114037854,4.33755608 0.114037854,4.76170152 0.326952128,5.09054046 C1.91176939,7.53821306 4.60107946,9 7.52041298,9 C10.4397465,9 13.1296902,7.53821306 14.7138738,5.09054046 C14.9267881,4.76233268 14.9267881,4.33755608 14.7138738,4.00934831" id="Visible"></path></g></g></g></g></g></svg></span>
                                    <span className="infoViewVal"></span></li>
                                    {/* <li><span><svg width="15px" height="9px" viewBox="0 0 15 9" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Flow1:-Visualise-the-deck" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Vs-j-1" transform="translate(-620.000000, -492.000000)" fill="#000000"><g id="deck" transform="translate(0.000000, 233.000000)"><g id="card/standard/sharing" transform="translate(561.000000, 1.000000)"><g id="Visible-Copy" transform="translate(59.000000, 258.000000)"><path d="M7.52041298,6.06443392 C6.68206303,6.06443392 5.99959674,5.38466512 5.99959674,4.5496288 C5.99959674,3.71459248 6.68206303,3.03482368 7.52041298,3.03482368 C8.35876294,3.03482368 9.04122923,3.71459248 9.04122923,4.5496288 C9.04122923,5.38466512 8.35876294,6.06443392 7.52041298,6.06443392 M7.52041298,2.27742112 C6.26257121,2.27742112 5.23918861,3.29675873 5.23918861,4.5496288 C5.23918861,5.80249887 6.26257121,6.82183648 7.52041298,6.82183648 C8.77825476,6.82183648 9.80163736,5.80249887 9.80163736,4.5496288 C9.80163736,3.29675873 8.77825476,2.27742112 7.52041298,2.27742112 M14.075131,4.67964957 C12.6303556,6.91083128 10.1805741,8.24259744 7.52041298,8.24259744 C4.8602519,8.24259744 2.41047039,6.91083128 0.966328626,4.67964957 C0.915634751,4.60201581 0.915634751,4.49724179 0.966328626,4.41960803 C2.41047039,2.18842632 4.8602519,0.857291326 7.52041298,0.857291326 C10.1805741,0.857291326 12.6303556,2.18842632 14.075131,4.4202392 C14.1251912,4.49787296 14.1251912,4.60201581 14.075131,4.67964957 M14.7138738,4.00934831 C13.1296902,1.56104454 10.4397465,0.0992575986 7.52041298,0.0992575986 C4.60107946,0.0992575986 1.91176939,1.56104454 0.326952128,4.00934831 C0.114037854,4.33755608 0.114037854,4.76170152 0.326952128,5.09054046 C1.91176939,7.53821306 4.60107946,9 7.52041298,9 C10.4397465,9 13.1296902,7.53821306 14.7138738,5.09054046 C14.9267881,4.76233268 14.9267881,4.33755608 14.7138738,4.00934831" id="Visible"></path></g></g></g></g></g></svg></span>
                                        <span class="infoViewVal">4.9</span></li>
                                    <li><span><svg width="15px" height="9px" viewBox="0 0 15 9" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Flow1:-Visualise-the-deck" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Vs-j-1" transform="translate(-620.000000, -492.000000)" fill="#000000"><g id="deck" transform="translate(0.000000, 233.000000)"><g id="card/standard/sharing" transform="translate(561.000000, 1.000000)"><g id="Visible-Copy" transform="translate(59.000000, 258.000000)"><path d="M7.52041298,6.06443392 C6.68206303,6.06443392 5.99959674,5.38466512 5.99959674,4.5496288 C5.99959674,3.71459248 6.68206303,3.03482368 7.52041298,3.03482368 C8.35876294,3.03482368 9.04122923,3.71459248 9.04122923,4.5496288 C9.04122923,5.38466512 8.35876294,6.06443392 7.52041298,6.06443392 M7.52041298,2.27742112 C6.26257121,2.27742112 5.23918861,3.29675873 5.23918861,4.5496288 C5.23918861,5.80249887 6.26257121,6.82183648 7.52041298,6.82183648 C8.77825476,6.82183648 9.80163736,5.80249887 9.80163736,4.5496288 C9.80163736,3.29675873 8.77825476,2.27742112 7.52041298,2.27742112 M14.075131,4.67964957 C12.6303556,6.91083128 10.1805741,8.24259744 7.52041298,8.24259744 C4.8602519,8.24259744 2.41047039,6.91083128 0.966328626,4.67964957 C0.915634751,4.60201581 0.915634751,4.49724179 0.966328626,4.41960803 C2.41047039,2.18842632 4.8602519,0.857291326 7.52041298,0.857291326 C10.1805741,0.857291326 12.6303556,2.18842632 14.075131,4.4202392 C14.1251912,4.49787296 14.1251912,4.60201581 14.075131,4.67964957 M14.7138738,4.00934831 C13.1296902,1.56104454 10.4397465,0.0992575986 7.52041298,0.0992575986 C4.60107946,0.0992575986 1.91176939,1.56104454 0.326952128,4.00934831 C0.114037854,4.33755608 0.114037854,4.76170152 0.326952128,5.09054046 C1.91176939,7.53821306 4.60107946,9 7.52041298,9 C10.4397465,9 13.1296902,7.53821306 14.7138738,5.09054046 C14.9267881,4.76233268 14.9267881,4.33755608 14.7138738,4.00934831" id="Visible"></path></g></g></g></g></g></svg></span>
                                        <span class="infoViewVal">lililashka</span></li> */}
                                    <li>
                                        <span className="etherValue"><svg width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                            <g id="Archived:-Signup/Setup-" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                                <g id="Vs-j-1" transform="translate(-704.000000, -136.000000)" stroke="#000000" strokeWidth="0.9">
                                                    <g id="Group" transform="translate(599.000000, 125.000000)">
                                                        <g id="icon/ether" transform="translate(104.614918, 11.000000)">
                                                            <path d="M10.0341613,8.05141043 C10.0360202,8.0543787 10.0378303,8.05737406 10.0395907,8.06039544 C10.1334559,8.22149313 10.0712788,8.42395799 9.90071426,8.51261336 L5.5,10.8 L5.5,0.933299838 C5.5,0.921530392 5.50657887,0.9106354 5.51730406,0.904643331 C5.53406065,0.895281565 5.55567973,0.90052231 5.56559164,0.916348862 L10.0341613,8.05141043 Z" id="Path-4"></path>
                                                            <path d="M5.5,13.6208003 L10.0295268,10.8052993 C10.0417074,10.797728 10.0572381,10.7983125 10.0688204,10.8067783 C10.0845631,10.8182851 10.0880384,10.8404319 10.0765826,10.8562447 L5.56375778,17.085425 C5.55712346,17.0945825 5.54652838,17.1 5.53525302,17.1 C5.51578331,17.1 5.5,17.0841465 5.5,17.0645902 L5.5,13.6208003 Z" id="Path-5"></path>
                                                            <path d="M0.965838736,8.05141043 L5.43440836,0.916348862 C5.44432027,0.90052231 5.46593935,0.895281565 5.48269594,0.904643331 C5.49342113,0.9106354 5.5,0.921530392 5.5,0.933299838 L5.5,10.8 L1.09928574,8.51261336 C0.928721241,8.42395799 0.866544136,8.22149313 0.960409292,8.06039544 C0.962169729,8.05737406 0.963979762,8.0543787 0.965838736,8.05141043 Z" id="Path-4"></path>
                                                            <path d="M5.5,13.6208003 L5.5,17.0645902 C5.5,17.0841465 5.48421669,17.1 5.46474698,17.1 C5.45347162,17.1 5.44287654,17.0945825 5.43624222,17.085425 L0.923417404,10.8562447 C0.911961602,10.8404319 0.915436856,10.8182851 0.931179601,10.8067783 C0.942761895,10.7983125 0.958292552,10.797728 0.970473163,10.8052993 L5.5,13.6208003 Z" id="Path-5"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg></span>
                                        <span className="infoViewVal"></span>
                                    </li>
                                    <li>
                                        <span>
                                            <img alt="like" src={user} width="14px" />
                                        </span>
                                        <span className="infoViewVal"></span>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="shareOnSingleDeck">
                                    <div className="shareOnSinglePart1">
                                        <img alt="" src={payload.image_url}/>
                                    </div>
                                    <div className="shareOnSinglePart2">
                                        {/* <h4 className="shareOnH1"></h4> */}

                                        {/* <span className="shareOnIconVal"><svg width="11px" height="16px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Archived:-Signup/Setup-" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><g id="Vs-j-1" transform="translate(-704.000000, -136.000000)" stroke="#000000" strokeWidth="0.9"><g id="Group" transform="translate(599.000000, 125.000000)"><g id="icon/ether" transform="translate(104.614918, 11.000000)"><path d="M10.0341613,8.05141043 C10.0360202,8.0543787 10.0378303,8.05737406 10.0395907,8.06039544 C10.1334559,8.22149313 10.0712788,8.42395799 9.90071426,8.51261336 L5.5,10.8 L5.5,0.933299838 C5.5,0.921530392 5.50657887,0.9106354 5.51730406,0.904643331 C5.53406065,0.895281565 5.55567973,0.90052231 5.56559164,0.916348862 L10.0341613,8.05141043 Z" id="Path-4"></path><path d="M5.5,13.6208003 L10.0295268,10.8052993 C10.0417074,10.797728 10.0572381,10.7983125 10.0688204,10.8067783 C10.0845631,10.8182851 10.0880384,10.8404319 10.0765826,10.8562447 L5.56375778,17.085425 C5.55712346,17.0945825 5.54652838,17.1 5.53525302,17.1 C5.51578331,17.1 5.5,17.0841465 5.5,17.0645902 L5.5,13.6208003 Z" id="Path-5"></path><path d="M0.965838736,8.05141043 L5.43440836,0.916348862 C5.44432027,0.90052231 5.46593935,0.895281565 5.48269594,0.904643331 C5.49342113,0.9106354 5.5,0.921530392 5.5,0.933299838 L5.5,10.8 L1.09928574,8.51261336 C0.928721241,8.42395799 0.866544136,8.22149313 0.960409292,8.06039544 C0.962169729,8.05737406 0.963979762,8.0543787 0.965838736,8.05141043 Z" id="Path-4"></path><path d="M5.5,13.6208003 L5.5,17.0645902 C5.5,17.0841465 5.48421669,17.1 5.46474698,17.1 C5.45347162,17.1 5.44287654,17.0945825 5.43624222,17.085425 L0.923417404,10.8562447 C0.911961602,10.8404319 0.915436856,10.8182851 0.931179601,10.8067783 C0.942761895,10.7983125 0.958292552,10.797728 0.970473163,10.8052993 L5.5,13.6208003 Z" id="Path-5"></path></g></g></g></g></svg>
                                            {data.last_price && data.last_price.toFixed(2)}</span>
                                        <p className="shareOnP">Gen {data.Views} | Cooldown index</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 text-center">
                                <p className="shareoOntext">Share this deck on</p>
                                <FacebookShareButton url={shareUrl}> <button type="button" className="shareOnbtn" onClick={this.props.onHide} ><img src={fb} alt="" />  Facebook</button></FacebookShareButton>
                                <TwitterShareButton url={shareUrl}><button type="submit" className="shareOnbtn" onClick={this.handleSubmit}><img src={twit} alt="" /> Twitter</button></TwitterShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    createnewdeck: credentials => dispatch(createnewdeck(credentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SocialShareedit);