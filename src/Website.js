import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isLoggedIn} from './index';
import {BrowserView, MobileView} from "react-device-detect";
import $ from "jquery";
import NotificationSystem from 'react-notification-system';
import * as websiteAction from './actions/websiteAction';
import Loader from '././components/Helper/Loader';
import {browserHistory} from 'react-router';
import ENVIRONMENT_VARIABLES from "./environment.config";


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
    }

    handleLogout = () => {
        this.props.actions.websiteAction.loggedOut();
    };

    handleLogin = () => {
        browserHistory.push('/Login');
    };

    render() {
        let userProfile = this.props.userAvatar;
        return (
            <div>
                <BrowserView>
                    <div>
                        <NotificationSystem ref="notificationSystem"/>
                        <nav className="navbar navbar-light" style={{height: "61px", backgroundColor: "#263238"}}>
                            <a className="navbar-brand" href="">
                                <img src="assets/Images/DB_Logo.png" className="d-inline-block align-top" alt=""/>
                            </a>
                            <ul className="navbar-nav">
                                <Link to="/">
                                    Home
                                </Link> |
                                <Link to="/Gallery">
                                    Gallery
                                </Link> |
                                <Link to="/VideoGallery">
                                    VideoGallery
                                </Link> |
                                <Link to="/ProductList">
                                    Stepper
                                </Link> |
                                {isLoggedIn() ?
                                    ( <span>
                                    <Link to="/Profile">
                                    Profile
                                    </Link> |
                                    <Link onClick={this.handleLogout} style={{cursor: "pointer"}}>
                                    Logout
                                    </Link>
                                    <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + userProfile}
                                         style={{borderRadius: "100%", height: 45, width: 45}} alt="Avatar"/>
                                </span>  ) :
                                    (
                                        <span>
                                        <Link onClick={this.handleLogin} style={{cursor: "pointer"}}>
                                            Login
                                        </Link> |
                                        <Link to="/Registration">
                                            Registration
                                        </Link>
                                    </span>
                                    )}
                            </ul>
                        </nav>
                        {this.props.children}
                    </div>
                </BrowserView>
                <MobileView>
                    <h1> Download Mobile Application </h1>
                </MobileView>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer,authReducer} = state;
    return {
        Loading: websiteReducer.Loading,
        error_msg: websiteReducer.error_msg,
        userAvatar:authReducer.userAvatar
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
