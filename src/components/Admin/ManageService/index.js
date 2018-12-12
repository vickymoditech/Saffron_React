import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import * as serviceAction from '../../../actions/serviceAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import './react-confirm-alert.css'

import './manage-service.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            notificationSystem: null
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
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
        } else {
            this.setState({serviceList: nextProps.serviceList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.serviceAction.ServiceList();
    }

    getSpecificService = (serviceId) => {
        alert(serviceId);
    };

    removeSpecificService = (serviceId) => {
        confirmAlert({
            key: serviceId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.serviceAction.ServiceDelete(serviceId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    render() {
        const {serviceList} = this.state;
        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                <div className="container tab-bg-container">
                    <h2> Manage Service </h2>
                    {serviceList.length > 0 && <div className="data-display col-sm-12">
                        <div className="table-responsive overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Service Image</th>
                                    <th style={{cursor: 'context-menu'}}>Title</th>
                                    <th style={{cursor: 'context-menu'}}>Description</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {serviceList && serviceList.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.image_url !== undefined ? (
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url} width="150px"
                                                 height="100px"/>) : (
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                 width="150px"
                                                 height="100px"/>)}</td>
                                        <td>{value.title}</td>
                                        <td>{value.description}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-primary" key={index}
                                                    onClick={event => {
                                                        this.getSpecificService(value.id)
                                                    }}>Edit
                                            </button>
                                            &nbsp;
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.removeSpecificService(value.id)
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
    const {manageServiceReducer} = state;
    return {
        Loading: manageServiceReducer.Loading,
        error_msg: manageServiceReducer.error_msg,
        serviceList: manageServiceReducer.serviceList,
        success_msg: manageServiceReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        serviceAction: bindActionCreators(serviceAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageService);


