import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Switch from 'react-flexible-switch';
import NotificationSystem from 'react-notification-system';
import * as userManageAction from '../../../actions/userManageAction';
import Loader from '../../Helper/Loader';


import './manage-user.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            notificationSystem: null,
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
        this.setState({userList: nextProps.userList || []});
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.userManageAction.UserList();
    }


    render() {

        const {userList} = this.state;

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                <div className="container tab-bg-container">
                    {userList.length > 0 && <div className="data-display col-sm-12">
                        <div className="table-responsive overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Profile</th>
                                    <th style={{cursor: 'context-menu'}}>First Name</th>
                                    <th style={{cursor: 'context-menu'}}>Last Name</th>
                                    <th style={{cursor: 'context-menu'}}>Contact</th>
                                    <th style={{cursor: 'context-menu'}}>Role</th>
                                    <th style={{cursor: 'context-menu'}}>UserId</th>
                                    <th style={{cursor: 'context-menu'}}>Block</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {userList && userList.map((value, index) => (
                                    <tr key={index}>
                                        <td><img src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url} width="150px"
                                                 height="100px"/></td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
                                        <td>{value.contact_no}</td>
                                        <td>{value.role}</td>
                                        <td>{value.userId}</td>
                                        <td style={{textAlign: "center"}}>
                                            <Switch value={value.block || false}
                                                    circleStyles={{onColor: 'green', offColor: 'red', diameter: 25}}
                                                    switchStyles={{width: 95}}
                                                    locked/>
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            Action
                                        </td>
                                    </tr>
                                ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }
                </div>
                {this.props.Loading && <Loader/>}
            </div>

        );

    }

}

const mapStateToProps = (state) => {
    const {manageUserReducer} = state;
    return {
        Loading: manageUserReducer.Loading,
        error_msg: manageUserReducer.error_msg,
        userList: manageUserReducer.userList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        userManageAction: bindActionCreators(userManageAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);


