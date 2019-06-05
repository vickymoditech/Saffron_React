import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import './react-confirm-alert.css'

import './manage-time.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageTimeSlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        //First Time check all the services are available.
    }

    addNewService = () => {
        alert("new service");
    };

    render() {

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>


                <div className="container tab-bg-container">
                    <h2> Manage TimeSlots </h2>

                    <button type="button" className="btn btn-primary"
                            onClick={this.addNewService}>Add new TimeSlot
                    </button>

                    <div className="data-display col-sm-12">
                        <div className="table-responsive overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Start Time</th>
                                    <th style={{cursor: 'context-menu'}}>End Time</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

// const mapStateToProps = (state) => {
//     const {manageServiceReducer, manageTeamProductReducer} = state;
//     return {
//         Loading: manageServiceReducer.Loading,
//         error_msg: manageServiceReducer.error_msg,
//         serviceList: manageServiceReducer.serviceList,
//         product_Loading: manageTeamProductReducer.Loading,
//         product_error_msg: manageTeamProductReducer.error_msg,
//         success_msg: manageTeamProductReducer.success_msg,
//         teamProductList: manageTeamProductReducer.teamProductList,
//         allProductList: manageTeamProductReducer.allProductList
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     actions: {
//         serviceAction: bindActionCreators(serviceAction, dispatch),
//         teamProductManageAction: bindActionCreators(teamProductManageAction, dispatch),
//     }
// });

export default ManageTimeSlot;