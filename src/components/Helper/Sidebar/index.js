import React, {Component} from 'react';
import {Drawer, List, ListItem, Divider} from 'material-ui';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import decode from 'jwt-decode';
import NotificationSystem from 'react-notification-system';

import ChangePasswordModal from '../ChangePasswordModal';
import * as authAction from '../../../actions/authAction';

import './Sidebar.css';

const stylesDrawer = {
    containerStyle: {
        backgroundColor: '#1f2b3e',
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
        color: '#99aecf'
    }
};

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            changePasswordDialog: false,
            notificationSystem: null,
        };
    }

    handleLogout = () => {
        this.props.actions.auth.loggedOut();
    };

    handleOpen = () => {
        this.setState({changePasswordDialog: true});
    };

    handleClose = () => {
        this.setState({changePasswordDialog: false});
    };

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 3
        });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };


    render() {
        const userProfile = decode(localStorage.getItem("accessToken"));
        const userRole = userProfile.user && userProfile.user.role;
        return (
            <div className="side-menu">
                {this.state.changePasswordDialog && <ChangePasswordModal
                    handleClose={this.handleClose}
                    isOpen={this.state.changePasswordDialog}
                    notify={this.addNotifications}
                />}
                <NotificationSystem ref="notificationSystem"/>
                <Drawer
                    className="menu-drawer"
                    open={this.state.open} containerStyle={stylesDrawer.containerStyle} docked={false}
                    onRequestChange={this.props.closeNav}>
                    <List style={{padding: 0}}>
                        <ListItem className="text-center" style={{color: "#fff", backgroundColor: "#1f3e70"}}
                                  innerDivStyle={stylesMenu.innerDivStyle}>
                            <span><img src="/assets/Images/DB_Logo.png" alt="" style={{width: 120}}/></span>
                            <span onClick={this.props.closeNav}><i className="fa fa-times"
                                                                   style={{position: 'absolute', right: 10, top: 10}}/> </span>
                        </ListItem>
                        <div className="menu-left">
                            <Link to="/Dashboard" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-home"/>
                                    <div style={{marginTop: 10}} className="link-hover">Home</div>
                                </ListItem>
                            </Link>
                            <Divider/>
                            <Link onClick={this.handleOpen} className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-unlock-alt"/>
                                    <div style={{marginTop: 10}} className="link-hover">Change Password</div>
                                </ListItem>
                            </Link>
                            <Divider/>
                            { userRole === "Admin" &&
                            <span><Link to="/Dashboard/ManageUser" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-user"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Users</div>
                                </ListItem>
                            </Link> <Divider/></span>}
                            <Link to="/Dashboard/Profile" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-user"/>
                                    <div style={{marginTop: 10}} className="link-hover">Profile</div>
                                </ListItem>
                            </Link>
                            <Divider/>
                        </div>
                    </List>
                    <Divider/>
                    <List className="logout-list">
                        <Link onClick={this.handleLogout} className="link">
                            <ListItem className="sidebar-list" style={ListStyles.style}>
                                <i className="fa fa-power-off"/>
                                <div style={{marginTop: 10}} className="link-hover">Logout</div>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    actions: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(Sidebar)