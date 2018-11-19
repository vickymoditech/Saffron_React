import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import $ from "jquery";
import NotificationSystem from 'react-notification-system';
import * as websiteAction from './actions/websiteAction';
import Loader from '././components/Helper/Loader';

import './websiteCss/Service.css';
import './websiteCss/MiddleCard.css';
import './websiteCss/3dimages.css';
import './websiteCss/Team.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            notificationSystem: null
        }
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        // eslint-disable-next-line
        let ua = navigator.userAgent.toLowerCase();
        let isSafari = false;
        try {
            // eslint-disable-next-line
            isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {return p.toString() === "[object SafariRemoteNotification]";})(!window['safari'] || safari.pushNotification);
        }
        catch (err) {
        }
        isSafari = (isSafari || ((ua.indexOf('safari') !== -1) && (!(ua.indexOf('chrome') !== -1) && (ua.indexOf('version/') !== -1))));
        if (isSafari) {
            $('body').addClass("iosSafari");
        }

        this.props.actions.websiteAction.getServiceList();
        this.props.actions.websiteAction.getTeamList();
        this.props.actions.websiteAction.getGallerys();

    }

    render() {
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <nav class="navbar navbar-light bg-dark" style={{height:"61px"}}>
                    <a class="navbar-brand" href="">
                        <img src="assets/Images/DB_Logo.png" class="d-inline-block align-top" alt=""/>
                    </a>
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="" style={{color:"white"}}>Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" style={{color:"white"}}>Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" style={{color:"white"}}>Pricing</a>
                            </li>
                        </ul>
                </nav>
                {this.props.Loading && <Loader/>}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        Loading: websiteReducer.Loading,
        error_msg: websiteReducer.error_msg
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);