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

    constructor(props) {
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
                <NotificationSystem ref="notificationSystem"/>
                {/*<nav className="navbar navbar-expand-md m-0 rounded-0 fixed-top" id="navbar"*/}
                {/*style={{backgroundColor: "#263238"}}>*/}
                {/*<a className="navbar-brand" href="">*/}
                {/*<img src="assets/Images/DB_Logo.png" alt=""/>*/}
                {/*</a>*/}
                {/*<ul className="nav navbar-nav ml-auto d-flex">*/}
                {/*<li className="nav-item">*/}
                {/*<Link to="/">*/}
                {/*Home*/}
                {/*</Link>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*<Link to="/Gallery">*/}
                {/*Gallery*/}
                {/*</Link>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*<Link to="/VideoGallery">*/}
                {/*VideoGallery*/}
                {/*</Link>*/}
                {/*</li>*/}
                {/*/!*<li className="nav-item">*!/*/}
                {/*/!*<Link to="/ProductList">*!/*/}
                {/*/!*Stepper*!/*/}
                {/*/!*</Link>*!/*/}
                {/*/!*</li>*!/*/}
                {/*{isLoggedIn() && <li className="nav-item">*/}
                {/*<Link to="/Profile">*/}
                {/*Profile*/}
                {/*</Link>*/}
                {/*</li>}*/}
                {/*{isLoggedIn() && <li className="nav-item">*/}
                {/*<Link onClick={this.handleLogout}>*/}
                {/*Logout*/}
                {/*</Link>*/}
                {/*</li>}*/}
                {/*{!isLoggedIn() && <li className="nav-item">*/}
                {/*<Link onClick={this.handleLogin}>*/}
                {/*Login*/}
                {/*</Link>*/}
                {/*</li>}*/}
                {/*{!isLoggedIn() && <li className="nav-item">*/}
                {/*<Link to="/Registration">*/}
                {/*Registration*/}
                {/*</Link>*/}
                {/*</li>}*/}

                {/*{isLoggedIn() && <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + userProfile}*/}
                {/*style={{borderRadius: "100%", height: 45, width: 45}}*/}
                {/*alt="Avatar"/>}*/}

                {/*</ul>*/}
                {/*</nav>*/}
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
