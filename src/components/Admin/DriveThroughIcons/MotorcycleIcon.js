import React, { Component } from 'react';
import './drive-through.css';
export default class MotorcycleIcon extends Component {
    render(){
        return(
            <div className="drive-through-icon extra-bike" style={{color:this.props.color.toLowerCase() === 'white' ? 'black' : this.props.color}}>
                {this.props.color.toLowerCase() === 'white' ? 'B' : 'b' }
            </div>
        )
    }
}