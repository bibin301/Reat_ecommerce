import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEditDeck } from './../services/service/action';
import * as propTypes from 'prop-types';



class DeleteDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            Description: "",
            Private: false,
            loading: false,
        }


    }

    static propTypes = {
        onHide: propTypes.func,


    }

    deleteDeck = (event) => {

        event.preventDefault();
        const { deckId } = this.props
        this.props.deleteEditDeck(deckId);
        this.props.onHide();
    }

    render() {


        return (
            <div id="myModal" className="modal fade in" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog">

                    {/* <!-- Modal content--> */}
                    <div className="modal-content popupCont">

                        <div className="modal-body">
                            <button type="button" className="close popupClose" data-dismiss="modal" onClick={this.props.onHide} >&times;</button>
                            <h2 className="deleTitle">Are you sure to delete this deck? </h2>
                            <p className="deleP">We can’t recover deleted deck. So let’s keep it?</p>
                            <div className="col-md-12">

                            </div>
                            <div className="col-md-12 margintpDn">
                                <button type="button" className="grayGoastBtn" onClick={this.props.onHide} >Keep my deck</button>
                                <button type="submit" className="blackGoastBtn pull-right" onClick={this.deleteDeck}>Delete deck</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // credentials: state.service.credentials,
});
const mapDispatchToProps = dispatch => ({
    deleteEditDeck: data => dispatch(deleteEditDeck(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteDeck);