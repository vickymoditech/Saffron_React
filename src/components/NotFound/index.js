import React, {Component} from 'react';
import {browserHistory} from 'react-router';

//import Header from '../Helpers/Header';
import './NotFound.css';

export default class NotFound extends Component {

    moveHome = () => {
        browserHistory.push("/");
    };

    render() {
        return (
            <div className="not-found-page">

                <div className="error-page">
                    <div className="error-404">
                        <div className="logo-404">
                            <img src="/assets/Images/404-icon.png" alt="404 Logo"/>
                        </div>
                        <div className="text-404">
                            <span>SORRY, THE DISH PAGE YOR ARE LOOKING FOR NOT FOUND !!!</span>
                        </div>
                        <div className="home-btn-404">
                            <button className="btn btn-save" onClick={this.moveHome}>Go to Homepage</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


