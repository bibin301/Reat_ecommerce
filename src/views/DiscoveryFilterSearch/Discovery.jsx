import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import SelectFieldOne from '../../components/SelectFieldOne'


import {
    map as _map,
    find as _find

} from 'lodash';
import * as propTypes from 'prop-types';

import { favPickList, collectionList, createPin, searchDiscovery } from '../../services/service/action';

import Filter from '../Sidebar/Filters';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Dashboard from '../Dashboard/Dashboard';
import CreateNewDeck from '../../modal/CreateNewDeck';
import Footer from '../../components/Footer';
import SocialShare from '../../modal/SocialShare';
import Loader from '../../components/loader.js';
import CreateDeck from '../../modal/CreateDeck';
import EditNewDeck from '../../modal/EditNewDeck'


const TYPE_OF_VIEW = {
    0: 'deck',
    1: 'item'
}

class Discovery extends Component {

    constructor(props) {
        super(props);
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

        this.state = {
            flip: false,
            loader: false,
            flipDropdown: false,
            sortedBy: false,
            selectCreater:'',
            isAfterLogin: sessiondata === null ? true : true,
            isCreateNewDeckModel: false,
            listData: [],
            isBannerOne: false,
            isBannerTwo: false,
            isBannerThree: false,
            hasMore: true,
            rotateImage: true,
            openDropDown: false,
            isVisible: true,
            isVisibleSortedBy: false,
            isVisibleSubModel: false,
            isShareVisible: false,
            isShareVisibleIndex: '',
            sortedByName: "",
            typeOfView: TYPE_OF_VIEW['0'],
            createDeckList: [],
            isShare: false,
            shareData: [],
            traitsSection: [],
            isCreateDeck: false,
            isEditNewDeck: false,
            hasMoreItems: false,
            flag: "",
            itemList: [
                {
                    "id": "1",
                    "name": "Sorted by",

                }, {
                    "id": "2",
                    "name": "For sale only",

                }, {
                    "id": "3",
                    "name": "Most viewed"
                },
                {
                    "id": "4",
                    "name": "Newly added"
                },
                {
                    "id": "5",
                    "name": "Highest price"
                },
                {
                    "id": "6",
                    "name": "Lowest price"
                }],

            deckListData: [
                {
                    "id": "1",
                    "name": "Sorted by",

                }, {
                    "id": "2",
                    "name": "Most viewed"
                },
                {
                    "id": "3",
                    "name": "Newly added"
                },
                {
                    "id": "4",
                    "name": "highest price"
                },
                {
                    "id": "5",
                    "name": "lowest price"
                }],
            statsInformation: []
        };

    }

    static propTypes = {
        deckType: propTypes.any,
        Tokenid: propTypes.any,
        Address: propTypes.any,
        deckId: propTypes.any,
        onHide: propTypes.any,
        showPopup: propTypes.any,
        statsinfo: propTypes.any
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

    toggleMenu = (event) => {
        event.preventDefault()
        this.setState({ isVisible: !this.state.isVisible });

        if (this.state.isVisible === true) {
            this.setState({ isVisibleSortedBy: true })
        } else if (this.state.isVisible === false) {
            this.setState({ isVisibleSortedBy: false })
        }

    }

    handleSelect = (event) =>{

        this.setState({selectCreater:event.target.value})

    }

    createNewDeckModal = () => {
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
        if (sessiondata) {
            this.setState({ isCreateNewDeckModel: !this.state.isCreateNewDeckModel })
        } else {
            this.props.history.push("/landingPage")
        }
    }

    closeModel = () => {
        this.setState({ isCreateNewDeckModel: false, isVisibleSubModel: false })
    }


    getSortedValue = (e) => {
        this.setState({ sortedByName: e.target.value })
    }

    componentDidMount() {

        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

        if (sessiondata) {
            this.props.favPickList();
            this.props.collectionList().then(response => {
                this.setState({ loader: false })
            })
        }

        // this.loadItems(this.props.favDappsListInfo[0]);

    }


    componentWillReceiveProps(newProps) {
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

        if (this.props.favDappsListInfo !== newProps.favDappsListInfo && sessiondata) {
            // this.loadItems(newProps.favDappsListInfo[0]);
        }

        if (this.props.osListInfo !== newProps.osListInfo && !sessiondata) {
            // this.loadItems(newProps.searchDropdownList.data[0]);
        }
    }


    loadItems = (favDappsInfo) => {
        favDappsInfo && this.props.searchDiscovery(favDappsInfo.Address || favDappsInfo.address)
    }


    //STO function for share 
    goToView = (i, each) => {
        sessionStorage.setItem('statsInfo', JSON.stringify(each));
        this.props.history.push("/viewStats?address=" + each.asset_contract.address + "&token=" + each.token_id);
    }

    imageFlip = (i, each) => {

        if (this.state.rotateImage) {
            this.setState({ rotateImage: this.state.rotateImage, openDropDown: i, flip: !this.state.flip });
        } else {
            this.setState({ rotateImage: !this.state.rotateImage, openDropDown: i, flip: !this.state.flip });
        }

    }

    //Sto share and create deck function
    showSubModel = (i, each) => {

        const createDeck = {
            "token_ID": each.token_id,
            "address": each.asset_contract.address
        }
        //isEditNewDeck


        this.setState({ createDeckList: createDeck })
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
        // return false;
        if (sessiondata) {
            //this.setState({isCreateDeck:true})

            if (this.props.collectionListInfo.length > 0) {
                this.setState({ isEditNewDeck: createDeck })

            } else if (this.props.collectionListInfo.length === 0) {
                this.setState({ isCreateDeck: true })
            }
            //this.setState({ isVisibleSubModel: !this.state.isVisibleSubModel, isVisibleSubModelIndex: i, isShareVisible: false });
        } else {
            this.props.history.push("/landingPage");
        }

    }

    showShare = (i) => {
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));

        if (sessiondata) {
            this.setState({ isShareVisible: !this.state.isShareVisible, isShareVisibleIndex: i, isVisibleSubModel: false });
        } else {
            this.props.history.push("/landingPage");
        }

    }
    //Eno share and create deck function
    share = (each, id) => {
        this.props.history.push("/socialDetails?address=" + each.asset_contract.address + "&token=" + each.token_id);
        this.setState({ isShare: true, shareData: each, flag: id })
    }

    closeShare = () => {
        this.setState({ isShare: false, isShareVisible: false })
    }

    handleTypeChange = (isState) => {
        this.setState({
            typeOfView: isState
                ? TYPE_OF_VIEW['0']
                : TYPE_OF_VIEW['1']
        })
        this.setState({ sortedBy: true })

    }

    loadUsers() {
        this.setState({ isLoading: true })
        this.props.searchDiscovery()
            .then(response => {
                this.setState({ listData: response.data })
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


    //function for  getPinValue

    getPinValue = (each) => {

        const PinData = {
            CollectionModelId: each.CollectionModelId,
            Note: each.Description,
            Address: each.Pins.length && each.Pins[0].Address,
            TokenId: "7654"
        }
        let i;
        for (i = 0; i < 3; i++) {
            this.props.createPin(PinData)
        }

    }

    getSingleBanner = (each) => {
        this.setState({ loader: true })
        const contarctAdderess = each.address;
        const data = contarctAdderess;
        this.props.searchDiscovery(data).then(response => {
            this.setState({ loader: false })
        })
        this.setState({ isBannerOne: true, isBannerTwo: false, isBannerThree: false });
    }

    getSingleBannerTwo = (each) => {
        this.setState({ loader: true })

        const contarctAdderess = each.address;
        const data = contarctAdderess;
        this.props.searchDiscovery(data).then(response => {
            this.setState({ loader: false })
        })
        this.setState({ isBannerOne: false, isBannerTwo: true, isBannerThree: false });
    }

    getSingleBannerThree = (each) => {
        this.setState({ loader: true })

        const contarctAdderess = each.address;
        const data = contarctAdderess;
        this.props.searchDiscovery(data).then(response => {
            this.setState({ loader: false })
        })
        this.setState({ isBannerOne: false, isBannerTwo: false, isBannerThree: true });
    }

    getBannerInfo = (each) => {

        const contarctAdderess = each.address;
        this.props.searchDiscovery(contarctAdderess);
        this.setState({ selDeck: each.address })
    }

    closeCreateDeck = () => {
        this.setState({ isCreateDeck: false, isEditNewDeck: false })
    }

    render() {
        let cookies = JSON.parse(sessionStorage.getItem("cookies"))
        let sessiondata = JSON.parse(sessionStorage.getItem('sessionData'));
        const { isEditNewDeck, isAfterLogin, isBannerOne, isBannerTwo, isBannerThree, hasMore, isLoading, isVisible, itemList, deckListData, isCreateNewDeckModel, typeOfView, sortedByName, isVisibleSortedBy, isShare, flag, isCreateDeck } = this.state;

        const { collectionListInfo, discoveryListInfo, osListInfo, favDappsListInfo } = this.props

        const userOne = _map(favDappsListInfo, 'Address')
        const imageListOne = _find(osListInfo, { "address": userOne[0] });
        const imageListTwo = _find(osListInfo, { "address": userOne[1] });
        const imageListThree = _find(osListInfo, { "address": userOne[2] });

        const renderCreateModel = isCreateNewDeckModel && <CreateNewDeck onHide={this.closeModel} isCreateNewDeckModel={isCreateNewDeckModel} deck_token={this.state.createDeckList} />

        const renderShareModel = isShare && <SocialShare singleDeckdata={this.state.shareData} onHide={this.closeShare} Flag={flag} />

        const renderCreatedeck = isCreateDeck && <CreateDeck onHide={this.closeCreateDeck} deck_token={this.state.createDeckList} />

        // isEditNewDeck

        const renderEditCreateDeck = isEditNewDeck && <EditNewDeck onHide={this.closeCreateDeck} CollectionInfo={collectionListInfo} deck_token={this.state.createDeckList} discoveryListInfo={discoveryListInfo} />

        //sessionStorage.setItem('address', JSON.stringify(osListInfo.data && osListInfo.data[0].address));
        return (
            <Fragment >
                <div className="container-fluid">
                    {renderCreateModel}
                    {renderShareModel}
                    {renderCreatedeck}
                    {renderEditCreateDeck}

                    <Header {...this.props} />
                    {isLoading &&
                        <div>Loading...</div>
                    }
                    {!hasMore &&
                        <div>You did it! You reached the end!</div>
                    }


                    <div className="col-md-12 col-sm-12 col-xs-12 marginBottom">
                        {sessiondata && <div className="">

                            <a className={`pull-right ${isVisible ? 'controlClrLess' : 'controlClr'}`} onClick={this.toggleMenu}> </a>

                            {typeOfView === 'item' && isVisibleSortedBy && <div className="selectcreateDiv pull-right marginRight">
                                <SelectFieldOne
                                    className="selectCreater selWid"
                                    onChange={(event) => this.handleSelect(event)}
                                    // name="manufacture_speed"
                                    options={deckListData}
                                    value={this.state.selectCreater}>
                                </SelectFieldOne>

                                {/* <select className="selectCreater selWid">
                                    {_map(deckListData, (each, i) => (
                                        <option key={i} name="sortedByName" value={each.name}>{each.name}</option>)
                                    )}
                                </select> */}
                            </div>}

                            {typeOfView === 'deck' && isVisibleSortedBy && <div className="selectcreateDiv pull-right marginRight">
                                {/* <select className="selectCreater selWid" onChange={this.getSortedValue} >
                                    {_map(itemList, (each, i) => (
                                        <option key={i} name="sortedByName" value={each.name}>{each.name}</option>)
                                    )}
                                </select> */}
                                    <SelectFieldOne
                                    className="selectCreater selWid"
                                    onChange={(event) => this.handleSelect(event)}
                                    // name="manufacture_speed"
                                     options={itemList}
                                    value={this.state.selectCreater}>
                                </SelectFieldOne>

                            </div>}
                        </div>}

                    </div>

                    <div id="" className="container">
                        <Filter
                            onTypeChange={this.handleTypeChange}
                            isVisible={isVisible}
                            decksList={this.props.decksList}
                            sortedByName={sortedByName}
                            sortBy ={this.state.selectCreater}
                        />

                        <div id="main-content" className={isVisible ? 'merge-left' : ''}>
                            {this.state.typeOfView === "deck" && <div id="section">
                                <div className="container-fluid dashboardFilter">
                                    <div id="content">
                                        {sessiondata && <div className="discoveryitem" >
                                            <div className={isBannerOne ? 'discoveryitemDiv activeDeck' : 'discoveryitemDiv'} onClick={() => this.getSingleBanner(imageListOne)}>
                                                <div className='discoveryItemBox' style={{ backgroundImage: "url(" + (imageListOne && imageListOne.image_url) + ")" }}>
                                                    <span className="discoveryItemTitle">{imageListOne && imageListOne.name}</span>
                                                </div>
                                            </div>
                                            <div className={isBannerTwo ? 'discoveryitemDiv activeDeck' : 'discoveryitemDiv'} onClick={() => this.getSingleBannerTwo(imageListTwo)}>
                                                <div className='discoveryItemBox' style={{ backgroundImage: "url(" + (imageListTwo && imageListTwo.image_url) + ")" }}>
                                                    <span className="discoveryItemTitle">{imageListTwo && imageListTwo.name}</span>
                                                </div>
                                            </div>
                                            <div className={isBannerThree ? 'discoveryitemDiv activeDeck' : 'discoveryitemDiv'} onClick={() => this.getSingleBannerThree(imageListThree)}>
                                                <div className='discoveryItemBox' style={{ backgroundImage: "url(" + (imageListThree && imageListThree.image_url) + ")" }}>
                                                    <span className="discoveryItemTitle">{imageListThree && imageListThree.name}</span>
                                                </div>
                                            </div>
                                        </div>}

                                        {sessiondata == null && <div>

                                            <div className="discoveryitem" >
                                                {osListInfo && osListInfo.filter((i, index) => i.address === '0x06012c8cf97bead5deae237070f9587f8e7a266d' || i.address === '0x6ebeaf8e8e946f0716e6533a6f2cefc83f60e8ab' || i.address === '0xc70be5b7c19529ef642d16c10dfe91c58b5c3bf0').map((each, i) => (
                                                    <div className={each.address === this.state.selDeck ? 'discoveryitemDiv activeDeck' : 'discoveryitemDiv'} key={i} onClick={() => this.getBannerInfo(each)}>
                                                        <div className='discoveryItemBox' style={{ backgroundImage: "url(" + each.image_url + ")" }}>
                                                            <span className="discoveryItemTitle">{each.name}</span>
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>}

                                        <InfiniteScroll
                                            pageStart={0}
                                            loadMore={this.loadItems.bind(this)}
                                            //dataLength={discoveryListInfo.length}
                                            hasMore={this.state.hasMoreItems}
                                            // loader={<div className="loader" key={0}>Loading ...</div>}
                                            useWindow={false}
                                        >
                                            {isAfterLogin && <div className="row" >
                                                {discoveryListInfo && discoveryListInfo.map((each, i) => {

                                                    return (
                                                        <Card key={i} asset={each} index={i}
                                                            onFlip={this.handleFlip}
                                                            onShowModal={this.showSubModel}
                                                            onShowShare={this.showShare}
                                                            onGoToView={this.goToView} />
                                                    )
                                                }
                                                )}

                                            </div>
                                            }
                                        </InfiniteScroll>
                                    </div>
                                </div>
                            </div>}
                            {this.state.typeOfView === "item" &&
                                <Dashboard {...this.props} deckType={this.state.typeOfView} />
                            }
                        </div>
                        {<Loader data={this.state.loader} />}

                    </div>
                    {!cookies === true ? <Footer /> : ""}
                </div >
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({

    credentials: state.service.credentials,
    osListInfo: state.service.osListInfo,
    decksList: state.service.decksList,
    imageList: state.service.imageList,
    collectionListInfo: state.service.collectionListInfo,
    discoveryListInfo: state.service.discoveryListInfo,
    favDappsListInfo: state.service.favDappsListInfo,
    loading: state.service.loading
});

const mapDispatchToProps = dispatch => ({

    favPickList: credentials => dispatch(favPickList(credentials)),
    collectionList: () => dispatch(collectionList()),
    createPin: pinData => dispatch(createPin(pinData)),
    searchDiscovery: data => dispatch(searchDiscovery(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);

