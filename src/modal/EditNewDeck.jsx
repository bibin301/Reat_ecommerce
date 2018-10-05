import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import {
    includes as _includes,
    difference as _differnce,
    find as _find,

} from 'lodash';

import { createnewdeck, createPin } from './../services/service/action';

import CreateNewDeck from './CreateNewDeck';
import Notifications, { notify } from 'react-notify-toast';
class EditNewDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            Description: "",
            Private: false,
            loading: false,
            isCreateDeck: false,
            disableButton: false,
            selected: [],
            wrapper: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static PropTypes = {
        onHide: PropTypes.func,
        isCreateNewDeckModel: PropTypes.bool,
        deck_token: PropTypes.any,
        CollectionInfo: PropTypes.any,

    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
        this.setState({ display: 'none' });
    }
    handleClickOutside(event) {
        this.setState({ wrapper: true });
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.state.wrapper) {
                this.props.onHide();
            }
        }
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === "Private") {
            this.setState({ Private: !this.state.Private });
        }
    }

    handleSubmit(event) {
        event.preventDefault();


        const data = {
            Name: this.state.Name || this.state.selected.Name,
            Description: this.state.Description,
            Private: this.state.Private
        }
        //this.props.createnewdeck(data).then(response)
        this.props.createnewdeck(data)
            .then(response => {

                if (response.data.data) {
                    const { deck_token } = this.props;
                    const responeInfo = response.data.data;

                    const pinData = {
                        CollectionModelId: responeInfo.CollectionModelId,
                        Note: responeInfo.Description,
                        Address: deck_token.address,
                        TokenId: deck_token.token_ID
                    }

                    this.props.createPin(pinData).then(response => {
                        let myColor = { background: '#40a562', text: "#FFFFFF" };
                        notify.show("saved Successfully", "custom", 1000, myColor)
                    })
                    this.props.onHide();

                }

            })

    }

    createDeck = (event) => {
        event.preventDefault();
        //CreateNewDeck
        if (this.setState({ isCreateDeck: true })) {

        }

    }

    handleCollectionSelect = (value) => {
        const { selected } = this.state;
        this.setState({ selected: this.handleSelection(selected, value), disableButton: true })
    }
    handleSelection = (available, value) => {
        let availableSelection = available;
        if (availableSelection) {
            _includes(availableSelection, value)
                ? availableSelection = _differnce(availableSelection, [value])
                : availableSelection.push(value)
        } else {
            availableSelection = [value];
        }
        return availableSelection;
    }

    closeCreateDeck = () => {
        this.setState({ isCreateDeck: false })

    }

    render() {

        const { isCreateDeck } = this.state;
        const { CollectionInfo, deck_token, discoveryListInfo } = this.props
        const result1 = _find(discoveryListInfo, { token_id: deck_token.token_ID })
        const renderCreatenewdeck = isCreateDeck && <CreateNewDeck onHide={this.closeCreateDeck} deck_token={this.props.deck_token} />
        return (
            <Fragment >
                <div id="myModal" className="modal fade in" role="dialog" style={{ display: 'block' }} >
                    <Notifications />
                    {renderCreatenewdeck}
                    <div className="modal-dialog editPopDialog" ref={this.setWrapperRef}>
                        <div className="modal-content popupCont">
                            <div className="modal-body">
                                <button type="button" className="close popupClose" data-dismiss="modal" onClick={this.props.onHide} >&times;</button>
                                <h2 className="popupTitle">Saving item</h2>
                                <p className="popupTitSub">This item will be added automatically to the deck</p>
                                <div className="col-md-12">
                                    <div className="col-md-6">
                                        <div className="deckBg editDeckBg">
                                            <div className="cartoon_sec"> <div class="cartoon_img"><img src={result1.image_url} /></div></div>
                                            <div class="caption"><div class="contentView"><span class="title">{result1.name}</span><span class="subTitle">Gen {result1.Views} | Cooldown Index </span></div><div class="rectangleBg"><div class="rectangle-2"><div class="rectangle-1"></div></div><span class="fighting">fighting</span></div><div class="valueShow"><span class="etherValue"><svg width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Archived:-Signup/Setup-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g id="Vs-j-1" transform="translate(-704.000000, -136.000000)" stroke="#000000" stroke-width="0.9"><g id="Group" transform="translate(599.000000, 125.000000)"><g id="icon/ether" transform="translate(104.614918, 11.000000)"><path d="M10.0341613,8.05141043 C10.0360202,8.0543787 10.0378303,8.05737406 10.0395907,8.06039544 C10.1334559,8.22149313 10.0712788,8.42395799 9.90071426,8.51261336 L5.5,10.8 L5.5,0.933299838 C5.5,0.921530392 5.50657887,0.9106354 5.51730406,0.904643331 C5.53406065,0.895281565 5.55567973,0.90052231 5.56559164,0.916348862 L10.0341613,8.05141043 Z" id="Path-4"></path><path d="M5.5,13.6208003 L10.0295268,10.8052993 C10.0417074,10.797728 10.0572381,10.7983125 10.0688204,10.8067783 C10.0845631,10.8182851 10.0880384,10.8404319 10.0765826,10.8562447 L5.56375778,17.085425 C5.55712346,17.0945825 5.54652838,17.1 5.53525302,17.1 C5.51578331,17.1 5.5,17.0841465 5.5,17.0645902 L5.5,13.6208003 Z" id="Path-5"></path><path d="M0.965838736,8.05141043 L5.43440836,0.916348862 C5.44432027,0.90052231 5.46593935,0.895281565 5.48269594,0.904643331 C5.49342113,0.9106354 5.5,0.921530392 5.5,0.933299838 L5.5,10.8 L1.09928574,8.51261336 C0.928721241,8.42395799 0.866544136,8.22149313 0.960409292,8.06039544 C0.962169729,8.05737406 0.963979762,8.0543787 0.965838736,8.05141043 Z" id="Path-4"></path><path d="M5.5,13.6208003 L5.5,17.0645902 C5.5,17.0841465 5.48421669,17.1 5.46474698,17.1 C5.45347162,17.1 5.44287654,17.0945825 5.43624222,17.085425 L0.923417404,10.8562447 C0.911961602,10.8404319 0.915436856,10.8182851 0.931179601,10.8067783 C0.942761895,10.7983125 0.958292552,10.797728 0.970473163,10.8052993 L5.5,13.6208003 Z" id="Path-5"></path></g></g></g></g></svg>{result1.last_price && result1.last_price.toFixed(2)}</span></div></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <form >
                                            <h3 className="saveDeckName">My deck :</h3>
                                            <ul className="mydeckUl">

                                                {CollectionInfo.filter((i, index) => (index < 8)).map((each, i) => (
                                                    <li>
                                                        <label className="mydeckCheck" > {each.Name}
                                                            <input type="checkbox"
                                                                onChange={() => this.setState({ selected: each })}
                                                                checked={_includes(this.state.selected, each.CollectionModelId)}

                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>

                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="text-center" ><button className="blackGoastBtn smallBtn" type="button" onClick={this.createDeck}> + Create New Deck</button></div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-12 margintpDn">
                                    <button type="button" className="blackGoastBtn" onClick={this.props.onHide} >Cancel</button>
                                    <button type="submit" className="blackGoastBtn pull-right" disabled={this.state.selected == ""} onClick={this.handleSubmit}>Save to Deck</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    createnewdeck: data => dispatch(createnewdeck(data)),
    createPin: pinData => dispatch(createPin(pinData))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditNewDeck);