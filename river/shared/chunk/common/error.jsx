'use strict';

import React,{Component} from "react";

class ErrorContent extends Component{
    render(){
        const {msg} = this.props.initialState
        return (
            <div className="error-content">
                <div className="error-layer">
                    <div className="error-panel">
                        <img src="/client/asset/image/error.png"/>
                        <p>{msg}</p>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorContent.defaultProps = {
    error:{
        msg:""
    }
}

export default ErrorContent;