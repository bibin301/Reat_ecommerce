import React from "react";

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                {this.props.data &&
                    <div className='art-loader'>
                        <div className='loader'>
                            <div className='circle'></div>
                            <div className='circle'></div>
                            <div className='circle'></div>
                            <div className='circle'></div>
                            <div className='circle'></div>
                        </div>
                    </div>

                }
            </div>


        );
    }
}
export default Loader;
