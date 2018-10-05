import React from 'react';
import { connect } from 'react-redux';
import { getDashboardDeckList, getPinsData, getEditdeckinfo } from '../../services/service/action';
import user from '../../asserts/images/user.png';

import Header from '../../components/Header'


class Viewdeck extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            showproperty: false
        }
    }

    viewProperty = () => {

        this.setState({ showproperty: !this.state.showproperty });
    }
    gridView = () => {

        this.props.history.push("/editDeck");
    }
    listView = () => {

        this.props.history.push("/listViewdeck");

    }

    render() {
        const { showproperty } = this.state;
        const { singleDeckdata, editDeckListData, decksList} = this.props;
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

                            <div className="sharemask"><span className="shareDeckText">Share deck</span></div>
                            <div className="iconShow">
                                <div className='' onClick={() => this.gridView()}>
                                    <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" >

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

                                        <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Vs-h-2" transform="translate(-1165.000000, -194.000000)" fill="#D8D8D8">
                                                <g id="nav/second" transform="translate(1135.000000, 192.000000)">
                                                    <path d="M30.8412935,10.4848633 L45.1587065,10.4848633 C45.6242222,10.4848633 46,10.0378241 46,9.48569731 C46,8.93357054 45.6242222,8.48486328 45.1587065,8.48486328 L30.8412935,8.48486328 C30.3757778,8.48486328 30,8.93357054 30,9.48569731 C30,10.0378241 30.3757778,10.4848633 30.8412935,10.4848633 M30.8110201,16.9697266 L45.1284331,16.9697266 C45.5939488,16.9697266 45.9697266,16.5226874 45.9697266,15.9705606 C45.9697266,15.4184338 45.5939488,14.9697266 45.1284331,14.9697266 L30.8110201,14.9697266 C30.3455043,14.9697266 29.9697266,15.4184338 29.9697266,15.9705606 C29.9697266,16.5226874 30.3455043,16.9697266 30.8110201,16.9697266 M29.9697266,3.00083403 C29.9697266,2.44870726 30.3455043,2 30.8110201,2 L45.1284331,2 C45.5939488,2 45.9697266,2.44870726 45.9697266,3.00083403 C45.9697266,3.5529608 45.5939488,4 45.1284331,4 L30.8110201,4 C30.3455043,4 29.9697266,3.5529608 29.9697266,3.00083403" id="listview"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">

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
                            {editDeckListData && editDeckListData.map((data, i) => {

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
                                                    return (<tbody key={i}>

                                                        <tr>
                                                            <td>{traits.value}</td>
                                                            <td><span className="tabType typeClr">{traits.trait_type}</span></td>
                                                            <td>{(traits.Percentage * 100).toFixed(2)}%</td>
                                                        </tr>

                                                    </tbody>)
                                                })}
                                            </table>}
                                        </td>
                                    </tr>
                                </tbody>)
                            })}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    editDeckListData: state.service.editDeckListData,
    decksList: state.service.decksList,
    singleDeckdata: state.service.singleDeckdata

});

const mapDispatchToProps = dispatch => ({
    getPinsData: credentials => dispatch(getPinsData(credentials)),
    getEditdeckinfo: credentials => dispatch(getEditdeckinfo(credentials)),
    getDashboardDeckList: credentials => dispatch(getDashboardDeckList(credentials)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Viewdeck);