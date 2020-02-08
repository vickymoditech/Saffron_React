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
                            <Link onClick={this.props.closeNav} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Home</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/ProductList" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Online Booking Now</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Offer Zone</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/Gallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Photos</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link onClick={this.props.closeNav} to="/VideoGallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Videos</div>
                                </ListItem>
                            </Link><Divider/>

                            {!isLoggedIn() && <span> <Link onClick={this.props.closeNav} to="/login" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Sign In</div>
                                </ListItem>
                            </Link><Divider/> </span>}

                            {!isLoggedIn() && <span> < Link onClick={this.props.closeNav} to="/Registration" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                <div style={{marginTop: 10}} className="link-hover">Sign UP</div>
                                </ListItem>
                                </Link><Divider/> </span>}

                            {isLoggedIn() && <span><Link onClick={this.props.closeNav} to="Profile/UserProfile" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Settings</div>
                                </ListItem>
                            </Link><Divider/></span>}

                            {isLoggedIn() && <span> <Link onClick={this.props.closeNav} to="Profile/TodayCompleteOrders" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Past Orders</div>
                                </ListItem>
                            </Link><Divider/> </span>}

                            {isLoggedIn() && <span> <Link onClick={this.props.logout} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">Sign out</div>
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
