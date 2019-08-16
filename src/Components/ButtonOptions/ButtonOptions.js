import React, { Component } from 'react'
import * as actions from '../../Action'
import {connect} from 'react-redux'
import './ButtonOptions.css'
class ButtonOptions extends Component {
    render() {

        return (
            <div className="parent-container">
                 <div className="ui container" id="button-container">
                <div className="btn" onClick={()=>this.props.seeMovieList()}>MOVIES</div>
                <div className="btn" onClick={()=>this.props.seeTVshowList()}> TV SHOWS</div>
            </div>
            </div>
        )
    }
}

export default connect(null,actions)(ButtonOptions)
