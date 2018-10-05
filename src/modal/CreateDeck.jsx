import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import CreateNewDeck from './CreateNewDeck'

class CreateDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreateNewdeck: false
        }

    }

    static PropTypes = {
        onHide: PropTypes.func,
        isCreateNewDeckModel: PropTypes.bool,
        deck_token: PropTypes.any

    }

    submit = (event) => {
        event.preventDefault();
        this.setState({ isCreateNewdeck: true })
    }

    render() {
        const { isCreateNewdeck } = this.state
        const renderCreateNewDeck = isCreateNewdeck && <CreateNewDeck deck_token={this.props.deck_token} onHide={this.props.onHide} />
        return (
            <div id="myModal" className="modal fade in" role="dialog" style={{ display: 'block' }}>
                {renderCreateNewDeck}
                <div className="modal-dialog">

                    <div className="modal-content popupCont">
                        <div className="modal-body">
                            <button type="button" className="close popupClose" data-dismiss="modal" onClick={this.props.onHide} >&times;</button>
                            <h3 className="popupTitle">Let's Create your first deck</h3>
                            <p className="popupTitSub">Items can be saved inside decks. Create one to get started.</p>

                            <div className="col-md-12 margintpDn">
                                <button type="button" className="blackGoastBtn" onClick={this.props.onHide} >Cancel</button>
                                <button type="submit" className="blackGoastBtn pull-right" onClick={this.submit}>Create new deck</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default CreateDeck;