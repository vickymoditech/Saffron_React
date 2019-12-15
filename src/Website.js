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
import '././components/Website/Home/websiteCss/website.css'
import ENVIRONMENT_VARIABLES from "./environment.config";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
            visible: false,
            theposition: 0
        }
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    listenToScroll = () => {
        const scrolled = window.scrollY;
        console.log(window.scrollY);
        console.log(window.pageYOffset);
        this.setState({theposition: scrolled});
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll, true);
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

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    handleLogout = () => {
        this.setState({visible: !this.state.visible});
        this.props.actions.websiteAction.loggedOut();
    };

    toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    render() {
        let userProfile = this.props.userAvatar;
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark navbar1 fixed-top scrolled pt-md-4" id="navbar">
                        <div className="col-2 d-flex flex-column text-center d-md-none d-block align-items-md-center first_logo logo1">
                            <i className="fa fa-camera"></i><span>Saffron</span>
                        </div>
                        <div className="container main_menu d-flex justify-content-end">
                            <button className="navbar-toggler text-right" data-toggle="collapse"
                                    data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon" onClick={this.toggle} ></span>
                            </button>
                            <div className={`collapse ${this.state.visible ? 'navbar-collapse' : ''} menu`}
                                 id="collapsibleNavbar">
                                <div className="col-md-5 menu1 text-right">
                                    <Link to="/" className="mr-md-5" onClick={this.toggle}>HOME</Link>
                                    <Link to="/Gallery" className="mr-md-5" onClick={this.toggle}>GALLERY</Link>
                                    <Link to="/ProductList" onClick={this.toggle}>SERVICES</Link>
                                </div>
                                <div className="col-md-2 d-md-flex d-none flex-column align-items-md-center logo1">
                                    <Link to="/"><span>Saffron</span></Link>
                                </div>
                                <div className="col-md-5 menu2">
                                    <Link to="/VideoGallery" onClick={this.toggle}>VIDEOS</Link>
                                    {!isLoggedIn() && <Link className="ml-md-5" to="/login" onClick={this.toggle}>LOGIN</Link>}
                                    {isLoggedIn() &&  <Link className="ml-md-5" onClick={this.handleLogout} to="/">LOGOUT</Link>}
                                    {!isLoggedIn() && <Link to="/Registration" className="ml-md-5" onClick={this.toggle}>SIGN IN</Link>}
                                    {isLoggedIn() && <Link to="/Profile" className="ml-md-5" onClick={this.toggle}>PROFILE</Link>}
                                    <a href="#" className="ml-md-5">CONTACT</a>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse menu">
                                <div className="col-md-5 menu1 text-right d-md-block d-none pt-md-3">
                                    <Link to="/" className="mr-md-5">HOME</Link>
                                    <Link to="/Gallery" className="mr-md-5">GALLERY</Link>
                                    <Link to="/ProductList">SERVICES</Link>
                                </div>
                                <div className="col-md-2 d-md-flex d-none flex-column align-items-md-center logo1">
                                    <Link to="/"><span>Saffron</span></Link>
                                </div>
                                <div className="col-md-5 menu2 d-md-block d-none pt-md-3">
                                    <Link to="/VideoGallery">VIDEOS</Link>
                                    {!isLoggedIn() && <Link className="ml-md-5" to="/login">LOGIN</Link>}
                                    {isLoggedIn() &&  <Link className="ml-md-5" onClick={this.handleLogout} to="/">LOGOUT</Link>}
                                    {!isLoggedIn() && <Link to="/Registration" className="ml-md-5">SIGN IN</Link>}
                                    {isLoggedIn() && <Link to="/Profile" className="ml-md-5">PROFILE</Link>}
                                    <a href="#" className="ml-md-5">CONTACT</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                {this.props.children}
                {this.props.Loading && <Loader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer, authReducer} = state;
    return {
        Loading: websiteReducer.Loading,
        error_msg: websiteReducer.error_msg,
        userAvatar: authReducer.userAvatar
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
