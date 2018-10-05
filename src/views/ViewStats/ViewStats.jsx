

import React from 'react';
import { connect } from 'react-redux';
import { getSingleDeckInfo } from '../../services/service/action';

import {

    find as _find

} from 'lodash';
import Header from '../../components/Header';
import user from '../../asserts/images/user.png';
import ViewstasShare from '../../modal/ViewstatsShare'
import * as PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios'
import Loader from '../../components/loader'
class ViewStats extends React.Component {
    constructor(props) {
        super(props)
        let params = queryString.parse(this.props.location.search)

        let statsInfo = JSON.parse(sessionStorage.getItem('statsInfo'));
        this.state = {
            loader: false,
            statusList: statsInfo,
            popup: false,
            params: params,
            data: {}

        }
    }

    static propTypes = {
        deckId: PropTypes.any
    }

    componentDidMount() {
        this.props.getSingleDeckInfo(12)
    }

    sharePopup = (e) => {
        e.preventDefault();
        this.setState({ popup: !this.state.popup })
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        const payload = {
            contract: params.address,
            limit: 15,
            Offset: 0
        }
        this.setState({ loader: true });

        axios.post("https://cryptodesksapi.azurewebsites.net/api/search/Search", payload)
            .then(response => {
                this.setState({ loader: false })
                this.setState({ data: response.data, })
            })


    }
    render() {

        const { singleDeckdata } = this.props;
        const { statusList, data, params } = this.state;
        const nameList = _find(data, function (o) { return o.token_id = params.token; });


        return (
            <div className="container-fluid">
                <Header {...this.props} />
                <div className="container">
                    <div className="sub-header">
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <h1 className="headLogo">Cool bots  </h1><span className='botAwesome'>Bots are awesome</span>
                        </div>
                        <div className="col-md-6  col-sm-6 col-xs-12 text-center">
                            <div className="infoSectBg">
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
                                    <li>
                                        <span>
                                            <img alt="like" src={user} width="14px" />
                                        </span>
                                        <span className="infoViewVal">{singleDeckdata.User && singleDeckdata.User.Username}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12">

                            <button className="blackGoastBtn pull-right" onClick={(e) => this.sharePopup(e)}>Share card</button>

                        </div>
                    </div>
                </div>
                <div className="container">
                    {nameList && <div className="row">
                        <div className="cartoon_img">
                            <img src={nameList.image_preview_url} alt="" />
                        </div>
                        <div className="caption_stats">
                            <div className="contentView">
                                <span className="title"> {nameList.asset_contract.name}</span>
                                <span className="subTitle">Gen {nameList.Views} | Cooldown index</span>
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
                                </svg>
                                </span>

                            </div>
                            <div className="sharebgDiv"><ul className="">
                                <li ><a ><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
                                </a></li>

                                <li><a href=""><svg width="12px" height="15px" viewBox="0 0 12 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Vs-j-1" transform="translate(-624.000000, -538.000000)" fill="#999999">
                                            <g id="deck" transform="translate(0.000000, 233.000000)">
                                                <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                                    <path d="M72.726812,318.151611 C71.9253544,318.151611 71.2735296,317.475872 71.2735296,316.64588 C71.2735296,315.815888 71.9253544,315.140856 72.726812,315.140856 C73.5282697,315.140856 74.1800945,315.815888 74.1800945,316.64588 C74.1800945,317.475872 73.5282697,318.151611 72.726812,318.151611 M65.273188,313.006085 C64.4717303,313.006085 63.8199055,312.329638 63.8199055,311.500354 C63.8199055,310.670362 64.4717303,309.994622 65.273188,309.994622 C66.0746456,309.994622 66.7264704,310.670362 66.7264704,311.500354 C66.7264704,312.329638 66.0746456,313.006085 65.273188,313.006085 M72.726812,304.848389 C73.5282697,304.848389 74.1800945,305.524128 74.1800945,306.35412 C74.1800945,307.184112 73.5282697,307.859144 72.726812,307.859144 C71.9253544,307.859144 71.2735296,307.184112 71.2735296,306.35412 C71.2735296,305.524128 71.9253544,304.848389 72.726812,304.848389 M72.726812,314.292467 C72.0872858,314.292467 71.5092524,314.567715 71.0952001,315.008538 L67.3605307,312.432945 C67.4801002,312.147082 67.5463759,311.831501 67.5463759,311.500354 C67.5463759,311.168499 67.4801002,310.853625 67.3605307,310.567055 L71.0952001,307.992169 C71.5092524,308.432992 72.0872858,308.707533 72.726812,308.707533 C73.9799009,308.707533 75,307.651823 75,306.35412 C75,305.05571 73.9799009,304 72.726812,304 C71.4730399,304 70.4529408,305.05571 70.4529408,306.35412 C70.4529408,306.685268 70.5198998,307.000142 70.6394693,307.286712 L66.9047999,309.861597 C66.4907476,309.420067 65.9127142,309.145526 65.273188,309.145526 C64.0194158,309.145526 63,310.201943 63,311.500354 C63,312.798764 64.0194158,313.854474 65.273188,313.854474 C65.9127142,313.854474 66.4907476,313.579933 66.9047999,313.138403 L70.6394693,315.713996 C70.5198998,315.999858 70.4529408,316.314732 70.4529408,316.64588 C70.4529408,317.94429 71.4730399,319 72.726812,319 C73.9799009,319 75,317.94429 75,316.64588 C75,315.348177 73.9799009,314.292467 72.726812,314.292467" id="Share-Copy"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                </a>
                                </li>
                            </ul>
                            </div>
                            <div className="">
                                <span className="ownedName" title='Gen 0|1/888'>Owned by {nameList.owner.address.slice(1, 8)}... </span>
                            </div>
                            <div className="deckTableScr">
                                <table className="propertyTable_stats marginTop">
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Type</th>
                                            <th>Rarity</th>
                                        </tr>
                                    </thead>

                                    <tbody >
                                        {nameList.traits && nameList.traits.map((traits, i) => {
                                            return (<tr key={i}>
                                                <td>{traits.value}</td>
                                                <td><span className="tabType typeClr">{traits.trait_type}</span></td>
                                                <td>{(traits.trait_count * 100).toFixed(2)}%</td>
                                            </tr>
                                            )
                                        })
                                        }
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>}
                </div>
                {this.state.popup === true ? <ViewstasShare params={this.state.params} payload={this.state.data} /> : ""}
                {<Loader data={this.state.loader} />}
            </div>

        )
    }
}


const mapStateToProps = (state) => ({

    singleDeckdata: state.service.singleDeckdata

});

const mapDispatchToProps = dispatch => ({

    getSingleDeckInfo: credentials => dispatch(getSingleDeckInfo(credentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewStats);


