import React from 'react';
import { connect } from 'react-redux';

import {
    map as _map,
    includes as _includes,
    find as _find
} from 'lodash';

import { editDeckDetails, deckDuplicate } from './../services/service/action';
import DeleteDeck from './DeleteDeck'

class EditDeckDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: this.props.deckeditPin.Name || "",
            Description: this.props.deckeditPin.Description || "",
            Private: false,
            isDelete: false

        }

    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === "Private") {
            this.setState({ Private: !this.state.Private });
        }
    }

    handleEditSubmit = (event) => {
        event.preventDefault();
        const { deckId } = this.props;
        this.props.deckId

        const data = {
            CollectionModelId: deckId,
            Name: this.state.Name,
            Description: this.state.Description,
            Private: this.state.Private
        }


        this.props.editDeckDetails(data)
    }

    deleteDeck = (event) => {

        event.preventDefault();

        this.setState({ isDelete: true })

    }

    duplicatedeck = (event) => {
        event.preventDefault();

        const { deckId } = this.props
        this.props.deckDuplicate(deckId);

    }

    close = (event) => {
        event.preventDefault();
        this.setState({ isDelete: false })
    }

   
    render() {

        const { deckeditPin, imageList } = this.props;
        const { isDelete } = this.state;
        const renderDeleteModel = isDelete && <DeleteDeck onHide={this.close} deckId={this.props.deckId} />

        return (

            <div className="modal fade in" role="dialog" style={{ display: "block" }}>
                {renderDeleteModel}
                <div className="modal-dialog modalDiaEditDeck">
                    <div className="modal-content popupCont">
                        <div className="modal-body">
                            <button type="button" className="close popupClose" data-dismiss="modal" onClick={this.props.onHide} >&times;</button>
                            <h2 className="popupTitle">Edit deck’s details</h2>
                            <p className="popupTitSub">You can update the details of this deck. Followers will receive notification about this update.</p>
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="deckDiv">
                                    {deckeditPin.Pins && deckeditPin.Pins.length === 1 &&
                                        <div className="deckDivFirst singleImg" >
                                            {deckeditPin.Pins && deckeditPin.Pins.map((data, index) => {
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
                                    {deckeditPin.Pins && deckeditPin.Pins.length === 2 &&
                                        <div className="deckDivFirst doubleImg" >
                                            {deckeditPin.Pins && deckeditPin.Pins.map((data, index) => {

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
                                    {deckeditPin.Pins && deckeditPin.Pins.length === 3 &&
                                        <div className="deckDivFirst doubleImg" >
                                            {deckeditPin.Pins && deckeditPin.Pins.map((data, index) => {

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

                                    {deckeditPin.Pins && deckeditPin.Pins.length >= 4 &&
                                        <div className="deckDivFirst fourImg" >
                                            {deckeditPin.Pins && deckeditPin.Pins.map((data, index) => {
                                                if (index <= 3) {
                                                    if (_includes(_map(imageList, 'token_id'), data.TokenId)) {
                                                        return (<img key={index} alt="preview" src={_find(imageList, { token_id: data.TokenId })['image_preview_url']} />
                                                        )
                                                    }
                                                }
                                            })
                                            }
                                        </div>
                                    }

                                    <div className="deckDivSecond">
                                        <span className="deckDivContText1">{deckeditPin.Name}</span>
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
                                        </svg>{deckeditPin.Value.toFixed(2)}</span>
                                        <span className="deckDivContText2">{deckeditPin.Description}</span>
                                        <span className="deckDivContText3">{deckeditPin.User && deckeditPin.User.Username}</span>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <form >
                                        <div className="form-group posiRel">
                                            <label className="commonLabel">Deck’s name</label>
                                            <input type="text" className="form-control commonInput" name="Name" name="Name" value={this.state.Name} onChange={this.handleChange} />

                                        </div>
                                        <div className="form-group posiRel">
                                            <label className="commonLabel">Description</label>
                                            <input type="text" className="form-control commonInput" name="Description" value={this.state.Description} onChange={this.handleChange} name="Description" />

                                        </div>
                                        <div className="form-group">
                                            <label className="labelPrivate"> Private</label>
                                            <label className="switch">
                                                <input type="checkbox" name="Private" checked={this.state.Private} onChange={this.handleChange}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                            <label className="labelPublic"> Pubilc</label>
                                            <div className="dropdown settingBg"><a className="dropdown-toggle settingDrop" type="button" data-toggle="dropdown">Setting</a>
                                                <ul className="dropdown-menu profileView">

                                                    <li onClick={this.deleteDeck}><a>Delete deck</a></li>
                                                    <li onClick={this.duplicatedeck}><a>Duplicate deck</a></li>

                                                </ul>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="col-md-12 margintpDn">

                                <div className="col-md-6 text-center"><button type="button" className="grayGoastBtn" onClick={this.props.onHide} >Cancel</button></div>
                                <div className="col-md-6 text-center"><button type="submit" className="blackGoastBtn" onClick={this.handleEditSubmit}>Save updates</button></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    deckEditInfo: state.service.deckEditInfo,
});
const mapDispatchToProps = dispatch => ({
    editDeckDetails: data => dispatch(editDeckDetails(data)),
    deckDuplicate: data => dispatch(deckDuplicate(data)),

});
export default connect(mapStateToProps, mapDispatchToProps)(EditDeckDetails);
