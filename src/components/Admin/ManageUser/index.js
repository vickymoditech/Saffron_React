import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Switch from 'react-flexible-switch';
import NotificationSystem from 'react-notification-system';
import * as userManageAction from '../../../actions/userManageAction';
import {confirmAlert} from 'react-confirm-alert';
import './react-confirm-alert.css'
import Loader from '../../Helper/Loader';


import './manage-user.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            notificationSystem: null,
            isFirstAvailability: false,
            search: "",
            setTimeoutObj: "",
        };
        this.onchangeBlock = this.onchangeBlock.bind(this);
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
        }else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.userManageAction.DefaultMessageClear();
        }
        this.setState({userList: nextProps.userList || []});
        if (this.props.reRender) {
            this.setState({isFirstAvailability: true});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.userManageAction.UserList();
    }

    onchangeBlock(active, contact_no) {
        if (!this.state.isFirstAvailability) {
            const userDetails = {
                "mobile_number": contact_no,
                "block": active
            };
            this.setState({isFirstAvailability: true});
            this.props.actions.userManageAction.changeUserBlockStatus(userDetails);
        } else {
            this.setState({isFirstAvailability: false});
        }
    };

    handleChange = (event) => {
        clearTimeout(this.state.setTimeoutObj);
        this.setState({
            setTimeoutObj: setTimeout(() => {
                this.props.actions.userManageAction.UserList(this.state.search);
            }, 1000)
        });
        return this.setState({search: event.target.value});
    };

    deleteUser = (userId) => {
        confirmAlert({
            key: userId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.userManageAction.deleteUser(userId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    render() {
        const {userList, search} = this.state;
        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2> Manage Users </h2>
                    <div className="form-group text-center w-25">
                        <div className="col-xs-12 text-center">
                            <input type="text" className="form-control" name="mobile_number"
                                   value={search} placeholder="Search (8401060120)" onChange={this.handleChange}/>
                        </div>
                    </div>
                    </div>
                    {userList.length > 0 && <div className="data-display mt-0 col-sm-12">
                        <div className="overflow-scroll">
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
                                    <th style={{cursor: 'context-menu'}}>Delete</th>
                                </tr>
                                {userList && userList.map((value, index) => (
                                    <tr key={value.id}>
                                        <td>{value.image_url !== undefined && value.image_url !== "" ? (
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url} width="150px"
                                                 height="150px"/>) : (
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                 width="150px"
                                                 height="150px"/>)}</td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
                                        <td>{value.contact_no}</td>
                                        <td>{value.role}</td>
                                        <td>{value.userId}</td>
                                        <td style={{textAlign: "center"}}>
                                            <Switch value={value.block}
                                                    circleStyles={{onColor: 'green', offColor: 'red', diameter: 25}}
                                                    switchStyles={{width: 95}}
                                                    onChange={(e) => {
                                                        this.onchangeBlock(!value.block, value.contact_no);
                                                    }}/>
                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.deleteUser(value.id)
                                                    }}>Delete
                                            </button>
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
        userList: manageUserReducer.userList,
        success_msg: manageUserReducer.success_msg,
        reRender: true
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        userManageAction: bindActionCreators(userManageAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);


