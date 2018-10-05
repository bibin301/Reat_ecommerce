import React, { Fragment } from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accept: true,
            popup: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
     
        this.setState({ accept: !this.state.accept })
        if(this.state.accept === true)
        {
        sessionStorage.setItem('cookies', JSON.stringify(this.state.accept));
        }
       
    }
    createNewDeckModal = (e) => {
        e.preventDefault();
        this.setState({ popup: !this.state.popup })
    }
    render() {

        return (
            <Fragment>
                {this.state.accept === true && <div>
                    <div className="footerBg">
                        <p>CryptoDecks uses cookies to make our site simpler and improve user experience. By continuing to browse the site, I understand and accept the use of cookies.<a href="" onClick={(e) => this.createNewDeckModal(e)}>Learn more.</a></p>
                        <button type="submit" className="blackGoastBtn pull-right" onClick={this.handleSubmit}>I accept</button>
                        {this.state.popup === true ? <Popup /> : ""}
                    </div>
                </div>}
            </Fragment>
        );
    }
}
export default Footer;


class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            closepopup: true
        }
    }
    closepopup = (e) => {
        this.setState({ closepopup: false })
    }
    render() {
        return (<Fragment>
            {this.state.closepopup &&
                <div className="modal termsModal" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <button type="button" className="close popupClose" data-dismiss="modal" onClick={(e) => this.closepopup(e)}>&times;</button>

                            <div className="modal-header termsHead">
                                <h4 className="modal-title termText">Terms & Conditions</h4>
                            </div>
                            <div className="modal-body termsBody">
                                <h4>Introduction </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam justo lectus, rhoncus sed ex vel, faucibus hendrerit magna. Nullam volutpat congue risus, et vulputate ipsum tempor eget. Pellentesque bibendum ac ante nec consequat. Sed sollicitudin blandit elit at vehicula. Donec iaculis quam dui, in accumsan urna vestibulum iaculis. Duis nec lorem ut felis luctus auctor. Cras eu ligula pretium, faucibus quam at, malesuada purus. Phasellus ornare convallis felis, ut fringilla lorem pharetra ut.</p>

                                <h4>First chapter </h4>
                                <p> Integer quis diam at dolor auctor porta eu ac turpis. In a ligula tortor. Aliquam lectus magna, interdum blandit ultricies vitae, volutpat id dolor. Donec tempor pellentesque volutpat. Nunc aliquam odio a pellentesque pharetra. Donec a augue in sapien fringilla hendrerit. Curabitur interdum eget nisl eu tempus. Maecenas nec hendrerit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed faucibus blandit aliquet. Nam fringilla mi sit amet sollicitudin cursus.</p>

                                <h4> Second chapter </h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam justo lectus, rhoncus sed ex vel, faucibus hendrerit magna. Nullam volutpat congue risus, et vulputate ipsum tempor eget. Pellentesque bibendum ac ante nec consequat. Sed sollicitudin blandit elit at vehicula. Donec iaculis quam dui, in accumsan urna vestibulum iaculis. Duis nec lorem ut felis luctus auctor. Cras eu ligula pretium, faucibus quam at, malesuada purus. Phasellus ornare convallis felis, ut fringilla lorem pharetra ut.</p>
                            </div>
                          
                        </div>

                    </div>
                </div>

            }
        </Fragment>
        );
    }
}