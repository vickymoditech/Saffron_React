import React, {Component} from 'react';
import {Drawer, List, ListItem, Divider} from 'material-ui';
import {Link} from 'react-router';
import './Sidebar.css';
import {isLoggedIn} from "../../../index";

const stylesDrawer = {
    containerStyle: {
        backgroundColor: '#bf925d',
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


    render() {
        return (
            <div className="side-menu">
                <Drawer
                    className="menu-drawer"
                    open={this.state.open} containerStyle={stylesDrawer.containerStyle} docked={false}
                    onRequestChange={this.props.closeNav}>
                    <List style={{padding: 0}}>
                        <ListItem className="text-center" style={{color: "#fff", backgroundColor: "#bf925d"}}
                                  innerDivStyle={stylesMenu.innerDivStyle}>
                            <span><img src="/assets/Images/DB_Logo.png" alt="" style={{width: 120}}/></span>
                            <span onClick={this.props.closeNav}><i className="fa fa-times"
                                                                   style={{position: 'absolute', right: 10, top: 10}}/> </span>
                        </ListItem>
                        <div className="menu-left">
                            <div class="d-flex justify-content-center btns py-3">
                                <button type="button" class="btn signup_btn mr-3">Sign Up</button>
                                <button type="button" class="btn login_btn">Login</button>
                            </div>
                            <Link onClick={this.props.closeNav} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}}><i class="fa fa-home"><span className="link-hover">Home</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/Gallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-picture-o"><span className="link-hover">Gallery</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/ProductList" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-shopping-bag"><span className="link-hover">Shop</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/VideoGallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-video-camera"><span className="link-hover">Videos</span></i></div>
                                </ListItem>
                            </Link><Divider/>

                            {!isLoggedIn() && <span> <Link onClick={this.props.closeNav} to="/login" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-sign-in"><span className="link-hover">Sign In</span></i></div>
                                </ListItem>
                            </Link><Divider/> </span>}

                            {!isLoggedIn() && <span> < Link onClick={this.props.closeNav} to="/Registration" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-user"><span className="link-hover">Sign UP</span></i></div>
                                </ListItem>
                                </Link><Divider/> </span>}

                            {isLoggedIn() && <span><Link onClick={this.props.closeNav} to="Profile/UserProfile" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-cogs"><span className="link-hover">Settings</span></i></div>
                                </ListItem>
                            </Link><Divider/></span>}

                            {isLoggedIn() && <span> <Link onClick={this.props.closeNav} to="Profile/TodayCompleteOrders" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-shopping-basket"><span className="link-hover">Orders</span></i></div>
                                </ListItem>
                            </Link><Divider/> </span>}

                            {isLoggedIn() && <span> <Link onClick={this.props.logout} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover"><i class="fa fa-power-off"><span className="link-hover">Sign out</span></i></div>
                                </ListItem>
                            </Link><Divider/> </span>}

                        </div>
                    </List>
                    <Divider/>
                </Drawer>
            </div>
        )
    }
}

export default Sidebar;
