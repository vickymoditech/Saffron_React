import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {isLoggedIn} from './index';
import $ from "jquery";
import NotificationSystem from 'react-notification-system';
import * as websiteAction from './actions/websiteAction';
import Loader from '././components/Helper/Loader';
import SuccessLoader from '././components/Helper/SuccessLoader';
import '././components/Website/Home/websiteCss/website.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Website/Footer';
import SidebarComponent from './components/Website/Sidebar';
import swal from 'sweetalert';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
            theposition: 0,
            orderPlace: false,
            open: false,
        }
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 25
        });
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            //this.addNotifications(nextProps.error_msg, "error");
            swal('Oops...', nextProps.error_msg, 'error');
        }
        if(nextProps.success_msg){
            this.props.actions.websiteAction.basketVisible(false);
            this.setState({orderPlace:true},() => {
                setTimeout(() => {
                    this.setState({orderPlace:false});
                    browserHistory.push('/Invoice');
                },1000);
            });
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
        this.setState({open:false});
    };

    BasketClick = () => {
        browserHistory.push('/BasketItems');
    };

    openNav = () =>{
        this.setState({open:true});
    };

    closeNav = () => {
        this.setState({open:false});
    };

    render() {
        const BasketProductCount = this.props.BasketGeneratorProducts && this.props.BasketGeneratorProducts.length;
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark navbar1 fixed-top scrolled pt-md-4 m-0 rounded-0" id="navbar">
                        <button type="button" className="bg-transparent border-0 d-md-block d-none" onClick={this.openNav}>
                        <i className="fa fa-bars" style={{fontSize:'25px'}}></i>
                        </button>
                        <div className="col-2 d-flex flex-column text-center d-md-none d-block align-items-md-center first_logo logo1">
                            <i className="fa fa-camera"></i><span>Saffron</span>
                        </div>
                        <div className="container main_menu d-flex justify-content-end">
                            <button className="navbar-toggler text-right" data-toggle="collapse"
                                    data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon" onClick={this.openNav} ></span>
                            </button>

                            <div className="collapse navbar-collapse menu">
                                <div className="col-md-5 menu1 text-right d-md-block d-none pt-lg-3">
                                    <Link to="/" className="mr-lg-5 mr-md-3">HOME</Link>
                                    <Link to="/Gallery" className="mr-lg-5 mr-md-3">GALLERY</Link>
                                    <Link to="/ProductList">SERVICES</Link>
                                </div>
                                <div className="col-md-2 d-md-flex d-none flex-column align-items-md-center logo1">
                                    <Link to="/"><span>Saffron</span></Link>
                                </div>
                                <div className="col-md-5 menu2 d-md-block d-none pt-lg-3">
                                    <Link to="/VideoGallery">VIDEOS</Link>
                                    {!isLoggedIn() && <Link className="ml-md-3 ml-lg-5" to="/login">SIGN IN</Link>}
                                    {isLoggedIn() &&  <Link className="ml-md-3 ml-lg-5" onClick={this.handleLogout} to="/">SIGN OUT</Link>}
                                    {!isLoggedIn() && <Link to="/Registration" className="ml-md-3 ml-lg-5">SIGN UP</Link>}
                                    <Link to="/About" className="ml-md-3 ml-lg-5">CONTACT</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                {this.state.open && <SidebarComponent closeNav={this.closeNav} open={this.state.open} logout={this.handleLogout}/>}
                {this.props.children}

                {(this.props.BasketVisible === true && BasketProductCount > 0) && <div className="fixed_position" onClick={this.BasketClick}>
                        <i className="fa fa-shopping-cart p-3"></i>
                        <span className="notification badge badge-danger">{BasketProductCount}</span>
                </div>}

                <Footer/>
                {this.props.Loading && <Loader/>}
                {this.state.orderPlace && <SuccessLoader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer, authReducer} = state;
    return {
        Loading: websiteReducer.Loading,
        error_msg: websiteReducer.error_msg,
        success_msg:websiteReducer.success_msg,
        userAvatar: authReducer.userAvatar,
        BasketGeneratorProducts: websiteReducer.BasketGeneratorProducts,
        BasketVisible: websiteReducer.BasketVisible
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
