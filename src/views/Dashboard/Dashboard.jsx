import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    map as _map,
    includes as _includes,
    find as _find
} from 'lodash';


import { getDashboardDeckList, getEditdeckinfo } from '../../services/service/action';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CreateNewDeck from '../../modal/CreateNewDeck';
import LineChart from 'react-linechart';
import './../../../node_modules/react-linechart/dist/styles.css';

import EditDeckDetailsModel from '../../modal/EditDeckDetails'

import Loader from '../../components/loader.js'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader:false,
            listData: [],
            deckeditPin: [],
            deckId:"",
            isCreateNewDeckModel: false,
            etherAddress: null,
            hasMore: true,
            rotateImage: false,
            openDropDown: '',
            openIndex: null,
            showPopup: false,
            editDeckEnable: true,
            isEditDetails: false,
            deck_id: '',
            editEnable: false,
            edit_id: '',
            tokenId: '',
            Address: '',
            graph: [
                {
                    color: "steelblue",
                    points: [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 7, y: -3 }]
                }
            ],
            graphData: [],
            Viewsdata: [],
            test: true
        };

    }

    onscroll = () => {
        const {
            loadUsers,
            state: {
                error,
                isLoading,
                hasMore,
            },

        } = this;
        if (error || isLoading || !hasMore) return;
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadUsers();
        }
    };



    componentDidMount() {
        this.setState({loader:true})
        this.props.getDashboardDeckList().then(response=>{
            this.setState({loader:false});
        })
        this.enableEdit();

    }
    editingdeck = (pins, deckid, pinData) => {
        
        this.setState({ isEditDetails: true, deckeditPin: pinData ,deckId:deckid })
        sessionStorage.setItem('pinList', JSON.stringify(pins));
        return false;
        // _map(pins,(pins, key) => {
        //     const deckInfo = {
        //         Address: pins.Address,
        //         TokenId: pins.TokenId
        //     }
        //     this.props.getEditdeckinfo(deckInfo);
        // })

        // sessionStorage.setItem('pinList', JSON.stringify(pins));
        // // let sessionData = JSON.parse(sessionStorage.getItem("pinList"));

        // this.setState({ editEnable: !this.state.editEnable, deck_id: deckid },
        //     () => this.props.history.push("/editDeck?deckid=" + deckid));

    }

    loadUsers() {
        this.setState({ isLoading: true })
        this.props.dashboardList()
            .then(response => {
                this.setState({ listData: response.data.data })
                this.setState({
                    hasMore: (this.state.listData.length < 100),
                    isLoading: false,

                });
            })
            .catch((err) => {
                this.setState({
                    isLoading: false,
                });
            })
    }

    createNewDeckModal = () => {
        this.setState({ isCreateNewDeckModel: true })
    }

    closeModel = () => {
        this.setState({ isCreateNewDeckModel: false })
    }

    deleteDeck = (id) => {

        this.setState({
            showPopup: !this.state.showPopup,
            deck_id: id
        });

    }

    closePop = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    // togglePopup = () => {
    //     this.props.deleteYourDeck(this.state.deck_id).then(response => {
    //         console.log("delete response", response);
    //         this.closePop();
    //         this.props.getDashboardDeckList();
    //         // if (response.data.status === 200) {
    //         //     this.closePop();
    //         //     this.props.getDashboardDeckList();

    //         // }
    //     }).catch((err) => {
    //         this.setState({
    //             isLoading: false,
    //         });
    //     })



    // }

    enableEdit = () => {
        this.setState({
            editDeckEnable: !this.state.editDeckEnable
        });
    }

    closeEditModel = (e) => {

        this.setState({ isEditDetails: false })
    }

    goGridView = (pins,id) =>{
        sessionStorage.setItem('pinList', JSON.stringify(pins));
        //this.props.history.push("ListViewdeck")
        this.props.history.push("/editDeck?deckid=" + id)
    }

    render() {

        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        const { isCreateNewDeckModel, editDeckEnable, isEditDetails, deckId, deckeditPin } = this.state;
        const data = [
            {
                color: "steelblue",
                points: this.props.Viewsdata
            }
        ];
        const renderCreateModel = isCreateNewDeckModel &&
            <CreateNewDeck onHide={this.closeModel}
                isCreateNewDeckModel={isCreateNewDeckModel} />

        // const renderDeleteModel = showPopup
        //     && <DeleteDeck onHide={this.togglePopup} close={this.closePop}
        //         showPopup={showPopup} />

        const { deckType, DecksDahboardList, imageList } = this.props;

        const renderDeckEditDetails = isEditDetails && <EditDeckDetailsModel onHide={this.closeEditModel} deckeditPin={deckeditPin} imageList={imageList} deckId={deckId} />

        return (

            <div className="container-fluid">

                {renderCreateModel}
                {/* {renderDeleteModel} */}
                {renderDeckEditDetails}

                {deckType !== "item" && < Header {...this.props} />}

                {deckType !== "item" && <div className="container">
                    <div className="sub-header">
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <h1 className="headLogo" >Dashboard  </h1>
                        </div>
                        <div className="col-md-6  col-sm-6 col-xs-12 text-center">

                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12  text-center">
                            <button className="blackGoastBtn" onClick={() => this.createNewDeckModal()}>Create new deck</button>
                        </div>
                    </div>
                </div>}

                {deckType !== "item" && <div className="container">
                    <div className="col-md-12">
                        <span className="chart"><svg width="18px" height="18px" viewBox="0 0 12 11" version="1.1" xmlns="http://www.w3.org/2000/svg">

                            <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Vs-j-1" transform="translate(-617.000000, -444.000000)" fill="#000000">
                                    <g id="deck" transform="translate(0.000000, 233.000000)">
                                        <g id="card/standard/sharing" transform="translate(561.000000, 1.000000)">
                                            <path d="M58.630762,217.762674 C58.726392,217.762674 58.822647,217.724942 58.8957758,217.650116 L61.6909214,214.790116 C61.7890515,214.689709 61.9478098,214.689709 62.0453149,214.790116 L63.00724,215.77436 C63.3841346,216.16064 64.0435439,216.16064 64.4210636,215.77436 L66.9868222,213.14843 L66.9868222,214.380814 C66.9868222,214.59314 67.154956,214.765174 67.3618418,214.765174 C67.5687275,214.765174 67.7362363,214.59314 67.7362363,214.380814 L67.7362363,212.222384 C67.7362363,212.1725 67.7268608,212.123256 67.7074848,212.07593 C67.6693578,211.981919 67.596854,211.907093 67.5043492,211.868721 C67.4587218,211.848895 67.4105943,211.838663 67.3618418,211.838663 L65.2523569,211.838663 C65.0454711,211.838663 64.8773374,212.010698 64.8773374,212.222384 C64.8773374,212.434709 65.0454711,212.606105 65.2523569,212.606105 L66.4567946,212.606105 L63.891036,215.231395 C63.7935309,215.331163 63.6347726,215.331163 63.5372676,215.231395 L62.5753425,214.247151 C62.1853222,213.848081 61.5509141,213.848081 61.1615188,214.247151 L58.3657482,217.107791 C58.2194906,217.257442 58.2194906,217.500465 58.3657482,217.650116 C58.438877,217.724942 58.535132,217.762674 58.630762,217.762674 M68,220.616279 C68,220.828605 67.8324913,221 67.6256055,221 L57.0000521,221 C56.4487734,221 56,220.541453 56,219.976744 L56,210.383721 C56,210.172035 56.1681338,210 56.3750195,210 C56.5819053,210 56.749414,210.172035 56.749414,210.383721 L56.749414,219.976744 C56.749414,220.118081 56.8619199,220.232558 57.0000521,220.232558 L67.6256055,220.232558 C67.8324913,220.232558 68,220.404593 68,220.616279" id="Chart"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg></span>
                        <span className="chartText">Stats</span>
                        <div className="chartIconShow">
                            <LineChart
                                width={600}
                                height={400}
                                xLabel={'Views'}
                                yLabel={'Date'}
                                data={data}
                                isDate="true"

                            />
                        </div>
                    </div>
                </div>}

                <div id="wrapper" >
                    <div id="page-content-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="leftCalDiv">
                                        <svg width="19px" height="20px" viewBox="0 0 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Flow1:-Visualise-the-deck" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="Vs-h-2" transform="translate(-1110.000000, -40.000000)" fill="#999999">
                                                    <g id="nav/top">
                                                        <g id="icon/deck" transform="translate(1110.000000, 40.590000)">
                                                            <path d="M3.61904762,8.06142898 L6.33333333,8.06142898 L6.33333333,10.7485717 L3.61904762,10.7485717 L3.61904762,8.06142898 Z M12.6666667,8.06142898 L15.3809524,8.06142898 L15.3809524,10.7485717 L12.6666667,10.7485717 L12.6666667,8.06142898 Z M12.6666667,12.5400003 L15.3809524,12.5400003 L15.3809524,15.2271431 L12.6666667,15.2271431 L12.6666667,12.5400003 Z M3.61904762,12.5400003 L6.33333333,12.5400003 L6.33333333,15.2271431 L3.61904762,15.2271431 L3.61904762,12.5400003 Z M8.14285714,12.5400003 L10.8571429,12.5400003 L10.8571429,15.2271431 L8.14285714,15.2271431 L8.14285714,12.5400003 Z M8.14285714,8.06142898 L10.8571429,8.06142898 L10.8571429,10.7485717 L8.14285714,10.7485717 L8.14285714,8.06142898 Z M18.0952381,4.47857146 L0.904761905,4.47857146 L0.904761905,2.59136144 C0.904761905,1.65670305 1.64490883,0.895714291 2.55625318,0.895714291 L3.7361827,0.895714291 L4.96736893,0.895714291 L14.0336562,0.895714291 L15.2627922,0.895714291 L16.4427217,0.895714291 C17.354066,0.895714291 18.0952381,1.65670305 18.0952381,2.59136144 L18.0952381,4.47857146 Z M18.0952381,16.3278602 C18.0952381,17.2027562 17.354066,17.9142858 16.4427217,17.9142858 L2.55625318,17.9142858 C1.64490883,17.9142858 0.904761905,17.2027562 0.904761905,16.3278602 L0.904761905,6.27000016 L18.0952381,6.27000016 L18.0952381,16.3278602 Z M15.0727254,0 L13.8842341,0 L5.11774833,0 L3.92727462,0 L2.78636269,0 C1.24994783,0 0,1.2592594 0,2.80711988 L0,16.0018815 C0,17.5507406 1.24994783,18.81 2.78636269,18.81 L16.2136373,18.81 C17.7510434,18.81 19,17.5507406 19,16.0018815 L19,2.80711988 C19,1.2592594 17.7510434,0 16.2136373,0 L15.0727254,0 Z" id="Calendar"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <span className="deckName">Deck</span>
                                        {DecksDahboardList.Decks && DecksDahboardList.Decks.length > 0 && <button className={editDeckEnable ? 'blackGoastBtn smallBtn purpleClr' : 'blackGoastBtn smallBtn'} onClick={() => this.enableEdit()}>Edit</button>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <span className="userNaVisible"> has {DecksDahboardList.Decks && DecksDahboardList.Decks.length} decks</span>
                                </div>
                            </div>
                            <div className="boxlist section-container">
                                <div className="row">
                                    {DecksDahboardList.Decks && DecksDahboardList.Decks.map((pin, i) => {
                                        return (
                                            <div key={i} className="col-lg-4">
                                                <div className="deckDiv">
                                                    {pin.Pins && pin.Pins.length >= 4 &&
                                                        <div className="deckDivFirst fourImg" onDoubleClick={(id) => this.goGridView(pin.Pins ,pin.CollectionModelId)}  style={{ background: data.background_color && pin.Pins.length ? `#${data.background_color}` : '#D8D8D8' }}>
                                                            {pin.Pins && pin.Pins.map((data, index) => 
                                                                index <= 3 
                                                                    &&_includes(_map(imageList, 'token_id'), data.TokenId)
                                                                    && <img key={index} alt="preview" 
                                                                        src={_find(imageList, { token_id: data.TokenId })['image_preview_url']} /> 
                                                            )}

                                                        </div>
                                                    }
                                                    {pin.Pins && pin.Pins.length === 1 &&
                                                        <div className="deckDivFirst singleImg" onDoubleClick={(id) => this.goGridView(pin.Pins ,pin.CollectionModelId)} style={{ background: data.background_color && pin.Pins.length ? `#${data.background_color}` : '#D8D8D8' }}>
                                                            {pin.Pins && pin.Pins.map((data, index) => {
                                                                if (index <= 0) {
                                                                    if (_includes(_map(imageList, 'token_id'), data.TokenId)) {
                                                                        return (<img key={index} alt="preview" src={_find(imageList, { token_id: data.TokenId })['image_preview_url']} />
                                                                        )
                                                                    }
                                                                }
                                                            })
                                                            }

                                                        </div>
                                                    }
                                                    {pin.Pins && pin.Pins.length === 2 &&
                                                        <div className="deckDivFirst doubleImg"  onDoubleClick={(id) => this.goGridView(pin.Pins ,pin.CollectionModelId)} style={{ background: data.background_color && pin.Pins.length ? `#${data.background_color}` : '#D8D8D8' }}>
                                                            {pin.Pins && pin.Pins.map((data, index) => {

                                                                if (index <= 1) {
                                                                    if (_includes(_map(imageList, 'token_id'), data.TokenId)) {
                                                                        return (<img key={index} alt="preview" src={_find(imageList, { token_id: data.TokenId })['image_preview_url']} />
                                                                        )
                                                                    }
                                                                }
                                                            })
                                                            }

                                                        </div>
                                                    }
                                                    {pin.Pins && pin.Pins.length === 3 &&
                                                        <div className="deckDivFirst doubleImg" onDoubleClick={( id) => this.goGridView(pin.Pins ,pin.CollectionModelId)} style={{ background: data.background_color && pin.Pins.length ? `#${data.background_color}` : '#D8D8D8' }}>
                                                            {pin.Pins && pin.Pins.map((data, index) => {

                                                                if (index <= 1) {
                                                                    if (_includes(_map(imageList, 'token_id'), data.TokenId)) {
                                                                        return (<img key={index} alt="preview" src={_find(imageList, { token_id: data.TokenId })['image_preview_url']} />
                                                                        )
                                                                    }
                                                                }
                                                            })
                                                            }

                                                        </div>
                                                    }
                                                    {pin.Pins && (pin.Pins.length === 0 || pin.Pins.length === null) &&
                                                        <div className="deckDivFirst doubleImg">
                                                            {/* <img alt="preview" src="" /> */}
                                                        </div>
                                                    }

                                                    <div className="deckDivSecond">
                                                        <span className="deckDivContText1">{pin.Name}</span>
                                                        <span className="deckDivContText4"><svg width="11px" height="16px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" >

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
                                                        </svg>{pin.Value.toFixed(2)}</span>
                                                        <span className="deckDivContText2">{pin.Description}</span>
                                                        <span className="deckDivContText3">{pin.User && pin.User.Username}</span>


                                                        {/* {
                                                            editDeckEnable && <button disabled={pin.Pins.length === 0} className={showPopup ? "grayGoastBtn smallBtn pull-right redClr" : "grayGoastBtn smallBtn pull-right"} onClick={() => this.deleteDeck(pin.CollectionModelId)}>Delete Deck</button>
                                                        } */}
                                                        {editDeckEnable && <button className="blackGoastBtn smallBtn" disabled={pin.Pins.length === 0} onClick={() => this.editingdeck(pin.Pins, pin.CollectionModelId, pin)}>Edit Details </button>
                                                        }

                                                    </div>


                                                </div>

                                            </div>


                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {<Loader data={this.state.loader}/>}
                {!cookies === true ? <Footer /> : ""}
            </div>

        );
    }
}


const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
    decksList: state.service.decksList,
    Viewsdata: state.service.Viewsdata,
    DecksDahboardList: state.service.DecksDahboardList,
    imageList: state.service.imageList,
    editDeckListData: state.service.editDeckListData
});
const mapDispatchToProps = dispatch => ({
    getDashboardDeckList: credentials => dispatch(getDashboardDeckList(credentials)),
    getEditdeckinfo: deckInfo => dispatch(getEditdeckinfo(deckInfo)),
  
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

