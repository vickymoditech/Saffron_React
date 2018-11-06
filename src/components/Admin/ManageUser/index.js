import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Switch from 'react-flexible-switch';
import NotificationSystem from 'react-notification-system';
import * as userManageAction from '../../../actions/userManageAction';
import Loader from '../../Helper/Loader';


import './manage-user.css';

class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            loading: null,
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
        debugger;
        this.setState({loading: nextProps.Loading, userList: nextProps.userList || []});

    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        //Todo Action call here
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
                                    <th style={{cursor: 'context-menu'}}>Email</th>
                                    <th style={{cursor: 'context-menu'}}>Role</th>
                                    <th style={{cursor: 'context-menu'}}>UserId</th>
                                    <th style={{cursor: 'context-menu'}}>Block</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {userList && userList.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.image_url}</td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
                                        <td>{value.contact_no}</td>
                                        <td>{value.email_id}</td>
                                        <td>{value.role}</td>
                                        <td>{value.userId}</td>
                                        <td style={{textAlign: "center"}}>
                                            <Switch value={value.block || false}
                                                    circleStyles={{onColor: 'green', offColor: 'red', diameter: 25}}
                                                    labels={{on: 'Enable', off: 'Disable'}}
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
                {this.props.loading && <Loader/>}
            </div>

        );

    }

}

const mapStateToProps = (state) => {
    debugger;
    const {manageUserReducer} = state;
    return {
        Loading: manageUserReducer.Loading,
        error_msg: manageUserReducer.error_msg,
        successMsg: manageUserReducer.successMsg,
        userList: manageUserReducer.userList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        userManageAction: bindActionCreators(userManageAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);


