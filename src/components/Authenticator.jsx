import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class Authenticator extends Component {
  constructor(props) {
    super(props)

    if (typeof props.credentials.access_token !== "undefined") {
      sessionStorage.setItem("sessionData", JSON.stringify(props.credentials))
    }
  }

  render() {
    return(
      <Fragment>
        { this.props.children }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  credentials: state.service.credentials
});

export default connect(mapStateToProps)(Authenticator);
