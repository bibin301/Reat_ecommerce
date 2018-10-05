import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { createnewdeck, createPin } from './../services/service/action';

import tick from './../asserts/icons/CheckTick.svg'

class CreateNewDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            Description: "",
            Private: false,
            loading: false,
            errors: { Name: '', Description: '' },
            NameValid: false,
            DescriptionValid: false,
            formValid: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static PropTypes = {
        onHide: PropTypes.func,
        isCreateNewDeckModel: PropTypes.bool,
        deck_token: PropTypes.any

    }


    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
        if (e.target.name === "Private") {
            this.setState({ Private: !this.state.Private });
        }
    }

    handleSubmit(event) {
        event.preventDefault();


        const data = {
            Name: this.state.Name,
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

                    this.props.createPin(pinData);
                    this.props.onHide();

                }

            })

    }
    validateForm() {
        this.setState({ formValid: this.state.NameValid && this.state.DescriptionValid });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let NameValid = this.state.NameValid;
        let DescriptionValid = this.state.DescriptionValid;

        switch (fieldName) {
            case 'Name':
                NameValid = value.length >= 6;
                fieldValidationErrors.Name = NameValid ? '' : ' Name should contain at least 6 characters';
                break;
            case 'Description':
                DescriptionValid = value.length >= 8;
                fieldValidationErrors.Description = DescriptionValid ? '' : 'Must contain minimum 8 characters';
                break;
            default:
                break;
        }

        this.setState({
            errors: fieldValidationErrors,
            NameValid: NameValid,
            DescriptionValid: DescriptionValid
        }, this.validateForm);
    }


    render() {

        return (
            <div id="myModal" className="modal fade in" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content popupCont">
                        <div className="modal-body">
                            <button type="button" className="close popupClose" data-dismiss="modal" onClick={this.props.onHide} >&times;</button>
                            <h2 className="popupTitle">Create New Deck</h2>
                            <p className="popupTitSub">This item will be added automatically to the deck</p>
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="deckBg">

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <form >
                                        <div className="form-group posiRel">
                                            <label className="commonLabel">Deck’s name</label>
                                            <input type="text" className="form-control commonInput" name="Name" value={this.state.Name} onChange={this.handleChange} /> {this.state.Name ? <span className="errorsuccess"><img alt="tick" src={tick} /></span> : ""}
                                            {this.state.errors.Name &&
                                                <label className="commonNotifyerror">{this.state.errors.Name}</label>
                                            }
                                        </div>
                                        <div className="form-group posiRel">
                                            <label className="commonLabel">Description</label>
                                            <input type="text" className="form-control commonInput" name="Description" value={this.state.Description} onChange={this.handleChange} />  {this.state.Description ? <span className="errorsuccess"><img alt="tick" src={tick} /></span> : ""}
                                            {this.state.errors.Description &&
                                                <label className="commonNotifyerror">{this.state.errors.Description}</label>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label className="labelPrivate"> Private</label>
                                            <label className="switch">
                                                <input type="checkbox" name="Private" checked={this.state.Private} onChange={this.handleChange} />
                                                <span className="slider round"></span>
                                            </label>
                                            <label className="labelPublic"> Pubilc</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-12 margintpDn">
                                <button type="button" className="blackGoastBtn" onClick={this.props.onHide} >Cancel</button>
                                <button type="submit" className="blackGoastBtn pull-right" onClick={this.handleSubmit} disabled={!this.state.formValid}>Create deck</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
// export default CreateNewDeckModel

const mapStateToProps = (state) => ({
    credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    createnewdeck: data => dispatch(createnewdeck(data)),
    createPin: pinData => dispatch(createPin(pinData))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewDeck);