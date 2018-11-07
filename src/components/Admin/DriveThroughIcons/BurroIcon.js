import React, { Component } from 'react';
import './drive-through.css';
export default class BurroIcon extends Component {
    render(){
        return(
            <div className="drive-through-icon" style={{color:this.props.color.toLowerCase() === 'white' ? 'black' : this.props.color}}>
                {this.props.color.toLowerCase() === 'white' ? 'E' : 'e' }
            </div>
        )
    }
}
