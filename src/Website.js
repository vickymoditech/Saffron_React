import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isLoggedIn} from './index';

import $ from "jquery";
import NotificationSystem from 'react-notification-system';
import * as websiteAction from './actions/websiteAction';
import Loader from '././components/Helper/Loader';
import * as authAction from './actions/authAction';
import {browserHistory} from 'react-router';
import io from 'socket.io-client';
import {subscribeToTimer} from './socket';
import ENVIRONMENT_VARIABLES from "./environment.config";

const socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);


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

        this.props.actions.websiteAction.getWebsiteHome();

        subscribeToTimer((err, data) => {
            debugger;
            console.log(data);
        });


    }

    handleLogout = () => {
        socket.emit('test', "Data pass here");
        this.props.actions.authAction.loggedOut();
    };

    handleLogin = () => {
        socket.emit('test', "Data pass here");
        browserHistory.push('/Login');
    };

    render() {
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <nav className="navbar navbar-light bg-dark" style={{height:"61px"}}>
                    <a className="navbar-brand" href="">
                        <img src="assets/Images/DB_Logo.png" className="d-inline-block align-top" alt=""/>
                    </a>
                        <ul className="navbar-nav">
                            <Link to="/" >
                                Home
                            </Link> |
                            <Link to="/Gallery" >
                                Gallery
                            </Link> |
                            <Link to="/VideoGallery" >
                                VideoGallery
                            </Link> |
                            {isLoggedIn() ?
                                (<Link onClick={this.handleLogout} style={{cursor: "pointer"}}>
                                    Logout
                                </Link> ) :
                                (<Link onClick={this.handleLogin} style={{cursor: "pointer"}}>
                                    Login
                                </Link>)}
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
        websiteAction: bindActionCreators(websiteAction, dispatch),
        authAction: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);