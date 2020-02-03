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
                            <Link to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">HOME</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link to="/Gallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">GALLERY</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link to="/ProductList" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">SERVICES</div>
                                </ListItem>
                            </Link><Divider/>

                            <Link to="/VideoGallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">VIDEOS</div>
                                </ListItem>
                            </Link><Divider/>

                            {!isLoggedIn() && <span> <Link to="/login" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">SIGN IN</div>
                                </ListItem>
                            </Link><Divider/> </span>}

                            {isLoggedIn() && <span> <Link onClick={this.props.logout} to="/" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">SIGN OUT</div>
                                </ListItem>
                            </Link><Divider/> </span>}

                            {!isLoggedIn() && <span> < Link to="/Registration" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                <div style={{marginTop: 10}} className="link-hover">Sign UP</div>
                                </ListItem>
                                </Link><Divider/> </span>}

                            {isLoggedIn() && <span><Link to="Profile/UserProfile" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">SETTING</div>
                                </ListItem>
                            </Link><Divider/></span>}

                            {isLoggedIn() && <span> <Link to="Profile/TodayCompleteOrders" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <div style={{marginTop: 10}} className="link-hover">YOUR ORDERS</div>
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
