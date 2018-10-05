import React from 'react';
import { connect } from 'react-redux';
import { getDashboardDeckList, getPinsData, getEditdeckinfo, getSingleDeckInfo } from '../../services/service/action';

import queryString from 'query-string';
import Header from '../../components/Header';

import Share from '../../modal/DeckShare';
import * as PropTypes from 'prop-types';
import fb from '../../asserts/images/facebook.png';
import twit from '../../asserts/images/twitter.png';
import shareicon from '../../asserts/icons/shareblack_default.svg';
import {
    map as _map,
    includes as _includes,
    find as _find
} from 'lodash';
import EditSocialDetails from './../ViewStats/EditSocialDetails'
class Editdeck extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search);
        this.state = {
            flipcard: false,
            flipDropdown: false,
            popup: false,
            openDropDown: false,
            rotateImage: true,
            flip: false,
            isShareVisible: false,
            isShareVisibleIndex: '',
            deckId: '',
            showPopup: false,
            popDeckData: '',
            parsed: parsed,
            isListView: false,
            isGridView: true,
            showproperty: false,
            editDeckFlag: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    static propTypes = {
        deckId: PropTypes.any
    }

    handleFlip = (i, e) => {
        this.setState({ flip: !this.state.flip, flipDropdown: i });
    }
    handleMouseLeave = (i) => {
        this.setState({ flip: false, flipDropdown: i });
    }
    componentDidMount() {
        let sessionData = JSON.parse(sessionStorage.getItem("pinList"));
        sessionData && sessionData.map((pins, key) => {
            const deckInfo = {
                Address: pins.Address,
                TokenId: pins.TokenId
            }
            this.props.getEditdeckinfo(deckInfo);

        })


        this.props.getSingleDeckInfo(this.state.parsed.deckid);

    }
    sharePopup = (e) => {
        e.preventDefault();
        this.setState({ popup: !this.state.popup })
    }
    goToView = (i, each) => {
        sessionStorage.setItem('statsInfo', JSON.stringify(each));
        this.props.history.push("/viewStats?address=" + each.asset_contract.address + "&token=" + each.token_id);
    }
    imageRotate = (i, each) => {
        this.setState({ rotateImage: !this.state.rotateImage, openDropDown: i, flip: !this.state.flip });

    }

    imageFlip = (i, each) => {

        if (this.state.rotateImage) {
            this.setState({ rotateImage: this.state.rotateImage, openDropDown: i, flip: !this.state.flip });
        } else {
            this.setState({ rotateImage: !this.state.rotateImage, openDropDown: i, flip: !this.state.flip });
        }

    }

    gridView = () => {
        this.setState({ isGridView: !this.state.isGridView, isListView: !this.state.isListView })
    }
    showShare = (i) => {
        this.setState({ isShareVisible: !this.state.isShareVisible, isShareVisibleIndex: i });
    }
    listView = () => {
        this.setState({ isListView: !this.state.isListView, isGridView: !this.state.isGridView });
        // this.props.history.push("/listViewdeck");
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
            isShareVisible: !this.state.isShareVisible,
        });

    }
    shareWithFacebook(data, flag) {
        this.setState({
            showPopup: !this.state.showPopup,
            popDeckData: data, editDeckFlag: flag

        });

        this.props.history.push("/editSocialDetails?address=" + data.asset_contract.address + "&token=" + data.token_id);

    }

    closeShare = () => {
        this.setState({ showPopup: false })
    }

    handleSubmit() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    viewProperty = () => {

        this.setState({ showproperty: !this.state.showproperty });
    }
    render() {
        const { showproperty } = this.state;
        const { singleDeckdata, editDeckListData } = this.props;
        let sessionData = JSON.parse(sessionStorage.getItem("pinList"));
        return (

            <div className="container-fluid">
                <Header {...this.props} />

                <div className="container">
                    <div className="sub-header">
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <h1 className="headLogo">{singleDeckdata.Name}  </h1><span className='botAwesome'>{singleDeckdata.Description}</span>
                        </div>
                        <div className="col-md-3  col-sm-3 col-xs-12 text-center">
                            <div className="infoSectBg deckSect">
                                <ul>
                                    <li>
                                        <span><svg width="15px" height="9px" viewBox="0 0 15 9" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                            <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="Vs-j-1" transform="translate(-620.000000, -492.000000)" fill="#000000">
                                                    <g id="deck" transform="translate(0.000000, 233.000000)">
                                                        <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                            <g id="Visible-Copy" transform="translate(59.000000, 258.000000)">
                                                                <path d="M7.52041298,6.06443392 C6.68206303,6.06443392 5.99959674,5.38466512 5.99959674,4.5496288 C5.99959674,3.71459248 6.68206303,3.03482368 7.52041298,3.03482368 C8.35876294,3.03482368 9.04122923,3.71459248 9.04122923,4.5496288 C9.04122923,5.38466512 8.35876294,6.06443392 7.52041298,6.06443392 M7.52041298,2.27742112 C6.26257121,2.27742112 5.23918861,3.29675873 5.23918861,4.5496288 C5.23918861,5.80249887 6.26257121,6.82183648 7.52041298,6.82183648 C8.77825476,6.82183648 9.80163736,5.80249887 9.80163736,4.5496288 C9.80163736,3.29675873 8.77825476,2.27742112 7.52041298,2.27742112 M14.075131,4.67964957 C12.6303556,6.91083128 10.1805741,8.24259744 7.52041298,8.24259744 C4.8602519,8.24259744 2.41047039,6.91083128 0.966328626,4.67964957 C0.915634751,4.60201581 0.915634751,4.49724179 0.966328626,4.41960803 C2.41047039,2.18842632 4.8602519,0.857291326 7.52041298,0.857291326 C10.1805741,0.857291326 12.6303556,2.18842632 14.075131,4.4202392 C14.1251912,4.49787296 14.1251912,4.60201581 14.075131,4.67964957 M14.7138738,4.00934831 C13.1296902,1.56104454 10.4397465,0.0992575986 7.52041298,0.0992575986 C4.60107946,0.0992575986 1.91176939,1.56104454 0.326952128,4.00934831 C0.114037854,4.33755608 0.114037854,4.76170152 0.326952128,5.09054046 C1.91176939,7.53821306 4.60107946,9 7.52041298,9 C10.4397465,9 13.1296902,7.53821306 14.7138738,5.09054046 C14.9267881,4.76233268 14.9267881,4.33755608 14.7138738,4.00934831" id="Visible"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg></span>
                                        <span className="infoViewVal">{singleDeckdata.Views}</span>
                                    </li>
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
                                        <span className="infoViewVal">{singleDeckdata.Likes}</span>
                                    </li>

                                </ul>

                            </div>
                            <div className="deckshare">
                                <a href="" onClick={(e) => this.sharePopup(e)}><img src={shareicon} /></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12 text-right">

                            {/* <button className="blackGoastBtn pull-right" onClick={(e) => this.sharePopup(e)}>Share deck</button> */}
                            <div className="userNameDeck">
                                {/* <img alt="like" src={user} width="14px" /> */}
                                <span className="userNameLetter">{singleDeckdata.User && singleDeckdata.User.Username.substring(0, 1).toUpperCase()}</span>
                                <span className="infoViewVal userNameSpan">{singleDeckdata.User && singleDeckdata.User.Username}</span> </div>
                        </div>
                        <div className="col-md-12">
                            <div className='iconShow'> <div className='' onClick={() => this.gridView()}>
                                <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                    <title>87CA2835-3AAC-4890-8671-9BE4E28CC71C</title>
                                    <desc>Created with sketchtool.</desc>
                                    <defs></defs>
                                    <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Vs-h-2" transform="translate(-1194.000000, -194.000000)" stroke="#000000" strokeWidth="1.5">
                                            <g id="nav/second" transform="translate(1135.000000, 192.000000)">
                                                <g id="gridview" transform="translate(59.000000, 2.000000)">
                                                    <rect id="Rectangle-6" x="0.75" y="0.75" width="5.5" height="5.5" rx="1"></rect>
                                                    <rect id="Rectangle-6" x="0.75" y="8.75" width="5.5" height="5.5" rx="1"></rect>
                                                    <rect id="Rectangle-6" fill="#FFFFFF" x="8.75" y="0.75" width="5.5" height="5.5" rx="1"></rect>
                                                    <rect id="Rectangle-6" fill="#FFFFFF" x="8.75" y="8.75" width="5.5" height="5.5" rx="1"></rect>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                                <div onClick={() => this.listView()}>
                                    <svg width="16px" height="15px" viewBox="0 0 16 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <title>B8B7B4E5-4C7B-4ACC-A67F-CAF9542C7DF4</title>
                                        <desc>Created with sketchtool.</desc>
                                        <defs></defs>
                                        <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Vs-h-2" transform="translate(-1165.000000, -194.000000)" fill="#D8D8D8">
                                                <g id="nav/second" transform="translate(1135.000000, 192.000000)">
                                                    <path d="M30.8412935,10.4848633 L45.1587065,10.4848633 C45.6242222,10.4848633 46,10.0378241 46,9.48569731 C46,8.93357054 45.6242222,8.48486328 45.1587065,8.48486328 L30.8412935,8.48486328 C30.3757778,8.48486328 30,8.93357054 30,9.48569731 C30,10.0378241 30.3757778,10.4848633 30.8412935,10.4848633 M30.8110201,16.9697266 L45.1284331,16.9697266 C45.5939488,16.9697266 45.9697266,16.5226874 45.9697266,15.9705606 C45.9697266,15.4184338 45.5939488,14.9697266 45.1284331,14.9697266 L30.8110201,14.9697266 C30.3455043,14.9697266 29.9697266,15.4184338 29.9697266,15.9705606 C29.9697266,16.5226874 30.3455043,16.9697266 30.8110201,16.9697266 M29.9697266,3.00083403 C29.9697266,2.44870726 30.3455043,2 30.8110201,2 L45.1284331,2 C45.5939488,2 45.9697266,2.44870726 45.9697266,3.00083403 C45.9697266,3.5529608 45.5939488,4 45.1284331,4 L30.8110201,4 C30.3455043,4 29.9697266,3.5529608 29.9697266,3.00083403" id="listview"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div></div>
                        </div>
                    </div>
                </div>

                {this.state.isGridView && <div className="container section-container">

                    <div className="row" >
                        {sessionData && sessionData.map((e, i) => {
                            if (_includes(_map(editDeckListData, 'token_id'), e.TokenId)) {
                                const edit = _find(editDeckListData, { token_id: e.TokenId })
                          
                                return (<div key={i} className="col-md-4 col-sm-6 col-xs-12" >
                                    <div className={this.state.flip && i == this.state.flipDropdown ? "card-flip clicked" : "card-flip "} onClick={() => this.handleFlip(i)} onMouseLeave={() => this.handleMouseLeave(i)}  >
                                        <div className="card-flip-flipper">
                                            <div className="force-overflow card-flip-content card-flip-content-front">
                                                <div className={this.state.rotateImage && i === this.state.openDropDown ? 'cartoon_sec' : 'cartoon_sec'} style={{ background: e.background_color ? `#${e.background_color}` : '#ffffff' }}>
                                                    {/* style={{ backgroundImage: "url(" + (background_color) + ")" }} */}
                                                    <div className={this.state.rotateImage && i === this.state.openDropDown ? 'cartoon_img' : 'cartoon_img'} onDoubleClick={() => this.goToView(i, edit)}>
                                                        <img src={edit.image_preview_url} alt="Lights" onClick={() => this.imageRotate(i, edit)} />
                                                    </div>


                                                    <div className={this.state.rotateImage && i === this.state.openDropDown ? 'uTurnArrow' : ''} onClick={() => this.imageFlip(i, edit)}><svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="Documentation" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                            <g id="Doc/deck" transform="translate(-805.000000, -2650.000000)" fill="#FFFFFF">
                                                                <g id="Group-2" transform="translate(116.000000, 1867.000000)">
                                                                    <g id="deck" transform="translate(0.000000, 111.000000)">
                                                                        <g id="card/standard/action" transform="translate(400.000000, 406.000000)">
                                                                            <path d="M303.491429,279.478377 C303.491429,279.711223 303.297524,279.899183 303.058929,279.899183 L294.408929,279.899183 C291.785816,279.899183 289.651429,277.822509 289.651429,275.270326 C289.651429,272.718143 291.785816,270.641469 294.408929,270.641469 L302.015162,270.641469 L298.429016,267.151592 C298.25962,266.987478 298.25962,266.720968 298.429016,266.556854 C298.597691,266.392039 298.870887,266.392039 299.039562,266.556854 L303.364562,270.764204 C303.404208,270.803479 303.435924,270.849768 303.45827,270.901667 C303.50152,271.004063 303.502241,271.120486 303.45827,271.222882 C303.435924,271.274781 303.404208,271.32107 303.364562,271.360345 L299.039562,275.567695 C298.955224,275.650453 298.844937,275.691131 298.733929,275.691131 C298.623641,275.691131 298.513354,275.650453 298.429016,275.567695 C298.25962,275.403581 298.25962,275.137071 298.429016,274.972957 L302.015162,271.48308 L294.408929,271.48308 C292.263008,271.48308 290.516429,273.18173 290.516429,275.270326 C290.516429,277.358922 292.263008,279.057572 294.408929,279.057572 L303.058929,279.057572 C303.297524,279.057572 303.491429,279.245532 303.491429,279.478377" id="U-turn-arrow"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    </div>

                                                </div>
                                                <div className="caption">

                                                    <div className="contentView">
                                                        <span className="title">{edit.name}</span>
                                                        <span className="subTitle">Gen {edit.Views} | Cooldown index</span>

                                                    </div>
                                                    <div className="rectangleBg">
                                                        <div className="rectangle-2"><div className="rectangle-1"></div></div>
                                                        <span className="fighting">fighting</span>
                                                    </div>

                                                    <div className="valueShow">
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
                                                        </svg>{edit.last_price && edit.last_price.toFixed(2)}</span>
                                                    </div>
                                                    <div className="sharebgDiv"><ul className="">

                                                        <li><a onClick={() => this.showShare(i)}><svg width="12px" height="15px" viewBox="0 0 12 15" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                                            <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                <g id="Vs-j-1" transform="translate(-624.000000, -538.000000)" fill="#999999">
                                                                    <g id="deck" transform="translate(0.000000, 233.000000)">
                                                                        <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                                            <path d="M72.726812,318.151611 C71.9253544,318.151611 71.2735296,317.475872 71.2735296,316.64588 C71.2735296,315.815888 71.9253544,315.140856 72.726812,315.140856 C73.5282697,315.140856 74.1800945,315.815888 74.1800945,316.64588 C74.1800945,317.475872 73.5282697,318.151611 72.726812,318.151611 M65.273188,313.006085 C64.4717303,313.006085 63.8199055,312.329638 63.8199055,311.500354 C63.8199055,310.670362 64.4717303,309.994622 65.273188,309.994622 C66.0746456,309.994622 66.7264704,310.670362 66.7264704,311.500354 C66.7264704,312.329638 66.0746456,313.006085 65.273188,313.006085 M72.726812,304.848389 C73.5282697,304.848389 74.1800945,305.524128 74.1800945,306.35412 C74.1800945,307.184112 73.5282697,307.859144 72.726812,307.859144 C71.9253544,307.859144 71.2735296,307.184112 71.2735296,306.35412 C71.2735296,305.524128 71.9253544,304.848389 72.726812,304.848389 M72.726812,314.292467 C72.0872858,314.292467 71.5092524,314.567715 71.0952001,315.008538 L67.3605307,312.432945 C67.4801002,312.147082 67.5463759,311.831501 67.5463759,311.500354 C67.5463759,311.168499 67.4801002,310.853625 67.3605307,310.567055 L71.0952001,307.992169 C71.5092524,308.432992 72.0872858,308.707533 72.726812,308.707533 C73.9799009,308.707533 75,307.651823 75,306.35412 C75,305.05571 73.9799009,304 72.726812,304 C71.4730399,304 70.4529408,305.05571 70.4529408,306.35412 C70.4529408,306.685268 70.5198998,307.000142 70.6394693,307.286712 L66.9047999,309.861597 C66.4907476,309.420067 65.9127142,309.145526 65.273188,309.145526 C64.0194158,309.145526 63,310.201943 63,311.500354 C63,312.798764 64.0194158,313.854474 65.273188,313.854474 C65.9127142,313.854474 66.4907476,313.579933 66.9047999,313.138403 L70.6394693,315.713996 C70.5198998,315.999858 70.4529408,316.314732 70.4529408,316.64588 C70.4529408,317.94429 71.4730399,319 72.726812,319 C73.9799009,319 75,317.94429 75,316.64588 C75,315.348177 73.9799009,314.292467 72.726812,314.292467" id="Share-Copy"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg></a></li>
                                                    </ul>

                                                    </div>
                                                    {this.state.isShareVisible && i === this.state.isShareVisibleIndex && <div className="deckHoverDivBg">
                                                        <span>Share on</span>
                                                        <button className="shareOnLinkBtn" onClick={() => this.shareWithFacebook(edit, 3)}><img src={fb} alt="" /> Facebook</button>
                                                        <button className="shareOnLinkBtn" onClick={() => this.shareWithFacebook(edit, 4)}><img src={twit} alt="" /> Twitter</button>
                                                    </div>
                                                    }


                                                </div>
                                            </div>
                                            <div className="force-overflow card-flip-content card-flip-content-back">
                                                {
                                                    <div>
                                                        <table className="propertyTable marginTop">
                                                            <thead>
                                                                <tr>
                                                                    <th>Property</th>
                                                                    <th>Type</th>
                                                                    <th>Rarity</th>
                                                                </tr>
                                                            </thead>
                                                            {edit.traits && edit.traits.map((traits, i) => {
                                                                return (<tbody key={i}>
                                                                    <tr>
                                                                        <td>{traits.value}</td>
                                                                        <td><span className="tabType typeClr">{traits.trait_type}</span></td>
                                                                        <td>{(traits.trait_count)}%</td>
                                                                    </tr>
                                                                </tbody>
                                                                )
                                                            })
                                                            }
                                                        </table>
                                                    </div>
                                                }
                                                {this.state.rotateImage && !this.state.flip && i === this.state.openDropDown && <div className={this.state.rotateImage && i === this.state.openDropDown ? 'detailShow detailBlock' : 'detailShow'}>
                                                    <span className="ownedName" title='Gen 0|1/888'>Owned by {edit.owner && edit.owner.user && edit.owner.user.username}</span>
                                                    <div className="firstDivShow">
                                                        <div className="firstDivtitle">
                                                            <svg width="12px" height="11px" viewBox="0 0 12 11" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                                                <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                    <g id="Vs-h-2" transform="translate(-617.000000, -444.000000)" fill="#000000">
                                                                        <g id="deck" transform="translate(0.000000, 233.000000)">
                                                                            <g id="card/standard/flipped" transform="translate(561.000000, 1.000000)">
                                                                                <path d="M58.630762,217.762674 C58.726392,217.762674 58.822647,217.724942 58.8957758,217.650116 L61.6909214,214.790116 C61.7890515,214.689709 61.9478098,214.689709 62.0453149,214.790116 L63.00724,215.77436 C63.3841346,216.16064 64.0435439,216.16064 64.4210636,215.77436 L66.9868222,213.14843 L66.9868222,214.380814 C66.9868222,214.59314 67.154956,214.765174 67.3618418,214.765174 C67.5687275,214.765174 67.7362363,214.59314 67.7362363,214.380814 L67.7362363,212.222384 C67.7362363,212.1725 67.7268608,212.123256 67.7074848,212.07593 C67.6693578,211.981919 67.596854,211.907093 67.5043492,211.868721 C67.4587218,211.848895 67.4105943,211.838663 67.3618418,211.838663 L65.2523569,211.838663 C65.0454711,211.838663 64.8773374,212.010698 64.8773374,212.222384 C64.8773374,212.434709 65.0454711,212.606105 65.2523569,212.606105 L66.4567946,212.606105 L63.891036,215.231395 C63.7935309,215.331163 63.6347726,215.331163 63.5372676,215.231395 L62.5753425,214.247151 C62.1853222,213.848081 61.5509141,213.848081 61.1615188,214.247151 L58.3657482,217.107791 C58.2194906,217.257442 58.2194906,217.500465 58.3657482,217.650116 C58.438877,217.724942 58.535132,217.762674 58.630762,217.762674 M68,220.616279 C68,220.828605 67.8324913,221 67.6256055,221 L57.0000521,221 C56.4487734,221 56,220.541453 56,219.976744 L56,210.383721 C56,210.172035 56.1681338,210 56.3750195,210 C56.5819053,210 56.749414,210.172035 56.749414,210.383721 L56.749414,219.976744 C56.749414,220.118081 56.8619199,220.232558 57.0000521,220.232558 L67.6256055,220.232558 C67.8324913,220.232558 68,220.404593 68,220.616279" id="Chart"></path>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="firstTitleText">Stats</span>
                                                        </div>
                                                        <div className="firstDivContent">
                                                            <ul>
                                                                <li><svg width="15px" height="9px" viewBox="0 0 15 9" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                                                    <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                        <g id="Vs-j-1" transform="translate(-620.000000, -492.000000)" fill="#999999">
                                                                            <g id="deck" transform="translate(0.000000, 233.000000)">
                                                                                <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                                                    <g id="Visible-Copy" transform="translate(59.000000, 258.000000)">
                                                                                        <path d="M7.52041298,6.06443392 C6.68206303,6.06443392 5.99959674,5.38466512 5.99959674,4.5496288 C5.99959674,3.71459248 6.68206303,3.03482368 7.52041298,3.03482368 C8.35876294,3.03482368 9.04122923,3.71459248 9.04122923,4.5496288 C9.04122923,5.38466512 8.35876294,6.06443392 7.52041298,6.06443392 M7.52041298,2.27742112 C6.26257121,2.27742112 5.23918861,3.29675873 5.23918861,4.5496288 C5.23918861,5.80249887 6.26257121,6.82183648 7.52041298,6.82183648 C8.77825476,6.82183648 9.80163736,5.80249887 9.80163736,4.5496288 C9.80163736,3.29675873 8.77825476,2.27742112 7.52041298,2.27742112 M14.075131,4.67964957 C12.6303556,6.91083128 10.1805741,8.24259744 7.52041298,8.24259744 C4.8602519,8.24259744 2.41047039,6.91083128 0.966328626,4.67964957 C0.915634751,4.60201581 0.915634751,4.49724179 0.966328626,4.41960803 C2.41047039,2.18842632 4.8602519,0.857291326 7.52041298,0.857291326 C10.1805741,0.857291326 12.6303556,2.18842632 14.075131,4.4202392 C14.1251912,4.49787296 14.1251912,4.60201581 14.075131,4.67964957 M14.7138738,4.00934831 C13.1296902,1.56104454 10.4397465,0.0992575986 7.52041298,0.0992575986 C4.60107946,0.0992575986 1.91176939,1.56104454 0.326952128,4.00934831 C0.114037854,4.33755608 0.114037854,4.76170152 0.326952128,5.09054046 C1.91176939,7.53821306 4.60107946,9 7.52041298,9 C10.4397465,9 13.1296902,7.53821306 14.7138738,5.09054046 C14.9267881,4.76233268 14.9267881,4.33755608 14.7138738,4.00934831" id="Visible"></path>
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg><span className="viewValue">&nbsp; {edit.Views}</span></li>
                                                                <li><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                                    <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                        <g id="Vs-j-1" transform="translate(-624.000000, -515.000000)" fill="#999999">
                                                                            <g id="deck" transform="translate(0.000000, 233.000000)">
                                                                                <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                                                    <path d="M74.2876875,291.355153 C74.2876875,291.858914 73.8884598,292.268754 73.3983366,292.268754 L72.9385118,292.268754 L72.9385118,289.609677 C72.9385118,289.055296 72.4988861,288.603985 71.9588593,288.603985 L66.0411407,288.603985 C65.5011139,288.603985 65.0620823,289.055296 65.0620823,289.609677 L65.0620823,292.268754 L64.6016634,292.268754 C64.1115402,292.268754 63.7123125,291.858914 63.7123125,291.355153 L63.7123125,282.645456 C63.7123125,282.141695 64.1115402,281.731856 64.6016634,281.731856 L65.2670429,281.731856 L65.2670429,283.335841 C65.2670429,283.890222 65.7066686,284.340923 66.2466954,284.340923 L69.4173474,284.340923 C69.9573741,284.340923 70.3964058,283.890222 70.3964058,283.335841 L70.3964058,281.731856 L70.4385861,281.731856 C70.6732512,281.731856 70.9049458,281.829437 71.0718847,281.995324 L74.0274766,285.029478 C74.1950097,285.202074 74.2876875,285.431388 74.2876875,285.675341 L74.2876875,291.355153 Z M72.2256052,292.268754 L65.7743948,292.268754 L65.7743948,289.609677 C65.7743948,289.459036 65.8944007,289.335231 66.0411407,289.335231 L71.9588593,289.335231 C72.1055993,289.335231 72.2256052,289.459036 72.2256052,289.609677 L72.2256052,292.268754 Z M65.9799495,281.731856 L69.6840933,281.731856 L69.6840933,283.335841 C69.6840933,283.486481 69.5640873,283.609677 69.4173474,283.609677 L66.2466954,283.609677 C66.0999554,283.609677 65.9799495,283.486481 65.9799495,283.335841 L65.9799495,281.731856 Z M74.5306698,284.512299 L71.5721075,281.475097 C71.2655577,281.168937 70.8627655,281 70.4385861,281 L70.0405466,281 L65.6234962,281 L64.6016634,281 C63.7182534,281 63,281.737955 63,282.645456 L63,291.355153 C63,292.262045 63.7182534,293 64.6016634,293 L73.3983366,293 C74.2817466,293 75,292.262045 75,291.355153 L75,285.675341 C75,285.236227 74.8336551,284.822728 74.5306698,284.512299 Z" id="Save"></path>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                    <span className="viewValue">&nbsp; </span></li>
                                                                <li><svg width="12px" height="15px" viewBox="0 0 12 15" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                                                    <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                        <g id="Vs-j-1" transform="translate(-624.000000, -538.000000)" fill="#999999">
                                                                            <g id="deck" transform="translate(0.000000, 233.000000)">
                                                                                <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                                                    <path d="M72.726812,318.151611 C71.9253544,318.151611 71.2735296,317.475872 71.2735296,316.64588 C71.2735296,315.815888 71.9253544,315.140856 72.726812,315.140856 C73.5282697,315.140856 74.1800945,315.815888 74.1800945,316.64588 C74.1800945,317.475872 73.5282697,318.151611 72.726812,318.151611 M65.273188,313.006085 C64.4717303,313.006085 63.8199055,312.329638 63.8199055,311.500354 C63.8199055,310.670362 64.4717303,309.994622 65.273188,309.994622 C66.0746456,309.994622 66.7264704,310.670362 66.7264704,311.500354 C66.7264704,312.329638 66.0746456,313.006085 65.273188,313.006085 M72.726812,304.848389 C73.5282697,304.848389 74.1800945,305.524128 74.1800945,306.35412 C74.1800945,307.184112 73.5282697,307.859144 72.726812,307.859144 C71.9253544,307.859144 71.2735296,307.184112 71.2735296,306.35412 C71.2735296,305.524128 71.9253544,304.848389 72.726812,304.848389 M72.726812,314.292467 C72.0872858,314.292467 71.5092524,314.567715 71.0952001,315.008538 L67.3605307,312.432945 C67.4801002,312.147082 67.5463759,311.831501 67.5463759,311.500354 C67.5463759,311.168499 67.4801002,310.853625 67.3605307,310.567055 L71.0952001,307.992169 C71.5092524,308.432992 72.0872858,308.707533 72.726812,308.707533 C73.9799009,308.707533 75,307.651823 75,306.35412 C75,305.05571 73.9799009,304 72.726812,304 C71.4730399,304 70.4529408,305.05571 70.4529408,306.35412 C70.4529408,306.685268 70.5198998,307.000142 70.6394693,307.286712 L66.9047999,309.861597 C66.4907476,309.420067 65.9127142,309.145526 65.273188,309.145526 C64.0194158,309.145526 63,310.201943 63,311.500354 C63,312.798764 64.0194158,313.854474 65.273188,313.854474 C65.9127142,313.854474 66.4907476,313.579933 66.9047999,313.138403 L70.6394693,315.713996 C70.5198998,315.999858 70.4529408,316.314732 70.4529408,316.64588 C70.4529408,317.94429 71.4730399,319 72.726812,319 C73.9799009,319 75,317.94429 75,316.64588 C75,315.348177 73.9799009,314.292467 72.726812,314.292467" id="Share-Copy"></path>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </svg> <span className="viewValue"> &nbsp; </span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="secondDivShow">
                                                        <div className="firstDivtitle">
                                                            <svg width="15px" height="11px" viewBox="0 0 15 11" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                                                <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                                    <g id="Vs-j-1" transform="translate(-750.000000, -445.000000)" fill="#000000">
                                                                        <g id="deck" transform="translate(0.000000, 233.000000)">
                                                                            <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                                                <path d="M200.002747,211 C199.729945,211 199.508242,211.224184 199.508242,211.500038 L199.508242,221.500796 C199.508242,221.77665 199.729945,222 200.002747,222 C200.275549,222 200.497253,221.77665 200.497253,221.500796 L200.497253,211.500038 C200.497253,211.224184 200.275549,211 200.002747,211 M203.505495,213.646034 C203.232692,213.646034 203.010989,213.869384 203.010989,214.145238 L203.010989,218.854762 C203.010989,219.130616 203.232692,219.353966 203.505495,219.353966 C203.778297,219.353966 204,219.130616 204,218.854762 L204,214.145238 C204,213.869384 203.778297,213.646034 203.505495,213.646034 M196.5,213.646034 C196.227198,213.646034 196.005495,213.869384 196.005495,214.145238 L196.005495,218.854762 C196.005495,219.130616 196.227198,219.353966 196.5,219.353966 C196.772802,219.353966 196.994505,219.130616 196.994505,218.854762 L196.994505,214.145238 C196.994505,213.869384 196.772802,213.646034 196.5,213.646034 M192.997253,211 C192.724451,211 192.502747,211.224184 192.502747,211.500038 L192.502747,221.500796 C192.502747,221.77665 192.724451,222 192.997253,222 C193.270055,222 193.491758,221.77665 193.491758,221.500796 L193.491758,211.500038 C193.491758,211.224184 193.270055,211 192.997253,211 M189.989011,214.145238 L189.989011,218.854762 C189.989011,219.130616 189.767308,219.353966 189.494505,219.353966 C189.221703,219.353966 189,219.130616 189,218.854762 L189,214.145238 C189,213.869384 189.221703,213.646034 189.494505,213.646034 C189.767308,213.646034 189.989011,213.869384 189.989011,214.145238" id="Equalizer"></path>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="firstTitleText">Properties</span>
                                                        </div>
                                                        <div className="firstDivContent">

                                                        </div>
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }

                        })
                        }
                       



                    </div>
                </div>

                }
                {this.state.popup === true ? <Share datalist={this.props.editDeckListData} singleDeckdata={singleDeckdata} /> : ""}
            
                {this.state.showPopup ? <EditSocialDetails address={this.state.popDeckData.asset_contract.address} token_id={this.state.popDeckData.token_id} /> : ""}
                {/* List view */}

                {this.state.isListView && <div className="container section-container">

                    <table className="deckViewTable">
                        <thead>
                            <tr>
                                <th className="">No</th>
                                <th className="">Token</th>
                                <th className="">Name</th>
                                <th className="">Properties
                        <span className={this.state.showproperty ? 'deckTurnIcon rotateIcon' : 'deckTurnIcon'} onClick={() => this.viewProperty()}><svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Documentation" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Doc/deck" transform="translate(-805.000000, -2650.000000)" fill="#999999">
                                                <g id="Group-2" transform="translate(116.000000, 1867.000000)">
                                                    <g id="deck" transform="translate(0.000000, 111.000000)">
                                                        <g id="card/standard/action" transform="translate(400.000000, 406.000000)">
                                                            <path d="M303.491429,279.478377 C303.491429,279.711223 303.297524,279.899183 303.058929,279.899183 L294.408929,279.899183 C291.785816,279.899183 289.651429,277.822509 289.651429,275.270326 C289.651429,272.718143 291.785816,270.641469 294.408929,270.641469 L302.015162,270.641469 L298.429016,267.151592 C298.25962,266.987478 298.25962,266.720968 298.429016,266.556854 C298.597691,266.392039 298.870887,266.392039 299.039562,266.556854 L303.364562,270.764204 C303.404208,270.803479 303.435924,270.849768 303.45827,270.901667 C303.50152,271.004063 303.502241,271.120486 303.45827,271.222882 C303.435924,271.274781 303.404208,271.32107 303.364562,271.360345 L299.039562,275.567695 C298.955224,275.650453 298.844937,275.691131 298.733929,275.691131 C298.623641,275.691131 298.513354,275.650453 298.429016,275.567695 C298.25962,275.403581 298.25962,275.137071 298.429016,274.972957 L302.015162,271.48308 L294.408929,271.48308 C292.263008,271.48308 290.516429,273.18173 290.516429,275.270326 C290.516429,277.358922 292.263008,279.057572 294.408929,279.057572 L303.058929,279.057572 C303.297524,279.057572 303.491429,279.245532 303.491429,279.478377" id="U-turn-arrow"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        {sessionData && sessionData.map((e, i) => {
                            if (_includes(_map(editDeckListData, 'token_id'), e.TokenId)) {
                                const data = _find(editDeckListData, { token_id: e.TokenId })
                                console.log("deciciciciiiiic", editDeckListData)
                                return (<tbody key={i}>
                                    <tr className="">
                                        <td>{i + 1}</td>
                                        <td><img src={data.image_preview_url} alt="tab" className="deckTabImage" /></td>
                                        <td>{data.name}</td>
                                        <td>
                                            {!showproperty && <span>Gen {data.Views} | Cooldown index </span>
                                            }
                                            {showproperty && <table className="propertyTable">
                                                <thead>
                                                    <tr>
                                                        <th>Property</th>
                                                        <th>Type</th>
                                                        <th>Rarity</th>
                                                    </tr>
                                                </thead>

                                                {data.traits && data.traits.map((traits, i) => {
                                                    console.log("tarits list view", traits)
                                                    return (<tbody key={i}>
                                                        <tr>
                                                            <td>{traits.value}</td>
                                                            <td><span className="tabType typeClr">{traits.trait_type}</span></td>
                                                            <td>{(traits.trait_count)}%</td>
                                                        </tr>

                                                    </tbody>)
                                                })}
                                            </table>}
                                        </td>
                                    </tr>
                                </tbody>)
                            }
                        })}
                    </table>
                </div>
                }

            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
    decksList: state.service.decksList,
    singleDeckdata: state.service.singleDeckdata,
    // imageList:state.service.imageList,
    editDeckListData: state.service.editDeckListData


});

const mapDispatchToProps = dispatch => ({
    getPinsData: credentials => dispatch(getPinsData(credentials)),
    getEditdeckinfo: credentials => dispatch(getEditdeckinfo(credentials)),
    getDashboardDeckList: credentials => dispatch(getDashboardDeckList(credentials)),
    getSingleDeckInfo: credentials => dispatch(getSingleDeckInfo(credentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Editdeck);


