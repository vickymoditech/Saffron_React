import React, {Component} from 'react';
import {Drawer, List, ListItem, Divider} from 'material-ui';
import {browserHistory, Link} from 'react-router';
import './Sidebar.css';
import {isLoggedIn} from "../../../index";

const stylesDrawer = {
    containerStyle: {
        backgroundColor: '#313131',
        paddingBottom:'3px',
        color: "#fff"
    }
};

const stylesMenu = {
    style: {
        color: "#fff",
        borderBottom: '1px solid #fff'
    },
    innerDivStyle: {
        padding: 20
    }
};

const ListStyles = {
    style: {
        textAlign: 'center',
        color: '#bf925d'
    }
};

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            notificationSystem: null,
        };
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    SignIn = () => {
        this.props.closeNav();
        browserHistory.push('/login');
    };

    SignUp = () => {
        this.props.closeNav();
        browserHistory.push('/Registration');
    };

    render() {
        return (
            <div className="side-menu">
                <Drawer
                    className="menu-drawer"
                    open={this.state.open} containerStyle={stylesDrawer.containerStyle} docked={false}
                    onRequestChange={this.props.closeNav}>
                    <List style={{padding: 0}}>
                        <ListItem className="text-center" style={{color: "#fff", backgroundColor: "#000000"}}
                                  innerDivStyle={stylesMenu.innerDivStyle}>
                            <span><img src="/assets/Images/DB_Logo.png" alt="" style={{width: 120}}/></span>
                            <span onClick={this.props.closeNav}><i className="fa fa-times"
                                                                   style={{position: 'absolute', right: 10, top: 10}}/> </span>
                        </ListItem>

                        <div className="menu-leftfront">
                            {!isLoggedIn() && <div className="d-flex justify-content-center btns py-3">
                                <button type="button" className="btn signup_btn mr-3" onClick={this.SignUp} >Sign Up</button>
                                <button type="button" className="btn login_btn" onClick={this.SignIn} >Sign In</button>
                            </div>}
                            <Link onClick={this.props.closeNav} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}}><i className="fa fa-home"><span
                                        className="link-hover pl-2">Home</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i className="fa fa-tags"><span className="link-hover pl-2">Offer Zone</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/ProductList" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i
                                        className="fa fa-shopping-bag"><span className="link-hover pl-2">Shop</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/Gallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i className="fa fa-picture-o"><span
                                        className="link-hover pl-2">Photos</span></i></div>
                                </ListItem>
                            </Link><Divider/>


                            <Link onClick={this.props.closeNav} to="/VideoGallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i
                                        className="fa fa-video-camera"><span className="link-hover pl-2">Videos</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            {isLoggedIn() && <span> <Link onClick={this.props.closeNav} to="/Profile/TodayCompleteOrders"
                                                          className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                             <div style={{marginTop: 10}} className="link-hover"><i className="fa fa-shopping-basket"><span
                                 className="link-hover pl-2">Your Past Orders</span></i></div>
                                </ListItem>
                            </Link><Divider/> </span>}


                            {isLoggedIn() &&
                            <span><Link onClick={this.props.closeNav} to="/Profile/UserProfile" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i className="fa fa-cogs"><span
                                        className="link-hover pl-2">Settings</span></i></div>
                                </ListItem>
                            </Link><Divider/></span>}


                            <span><Link onClick={this.props.closeNav} to="/About" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i className="fa fa-cogs"><span
                                        className="link-hover pl-2">Contact Us</span></i></div>
                                </ListItem>
                            </Link><Divider/></span>


                        </div>
                    </List>
                    <Divider/>
                    {isLoggedIn() && <List className="logout-list">
                        <Link onClick={this.props.logout} className="link" to="/">
                            <ListItem className="sidebar-list bg_color_logout" style={ListStyles.style}>
                                <i className="fa fa-power-off"/>
                                <div style={{marginTop: 10}} className="link-hover">Sign Out</div>
                            </ListItem>
                        </Link>
                    </List>}
                </Drawer>
            </div>
        )
    }
}

export default Sidebar;
