import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import * as teamAction from '../../../actions/teamAction';
import Loader from '../../Helper/Loader';
import ProductDialog from '../Helper/AddCommonDialog';

import {confirmAlert} from 'react-confirm-alert';
import './react-confirm-alert.css'


import './manage-team.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamList: [],
            notificationSystem: null,
            isFirstAvailability: false,
            isDialogOpen: false
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
            this.setState({teamList: nextProps.teamList || []});
            this.setState({isDialogOpen: false});
        } else {
            this.setState({teamList: nextProps.teamList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.teamAction.TeamList();
    }

    getSpecificTeam = (teamId) => {
        alert(teamId);
    };

    removeSpecificTeam = (teamId) => {
        confirmAlert({
            key: teamId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.teamAction.TeamDelete(teamId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewTeam = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    render() {
        const {teamList} = this.state;
        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <ProductDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen}
                               notify={this.addNotifications} status={"team"} />}
                <div className="container tab-bg-container">
                    <h2> Manage Teams Member </h2>
                    <button type="button" className="btn btn-primary"
                            onClick={this.addNewTeam}>Add team member
                    </button>
                    {teamList.length > 0 && <div className="data-display col-sm-12">
                        <div className="table-responsive overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Member Profile</th>
                                    <th style={{cursor: 'context-menu'}}>Name</th>
                                    <th style={{cursor: 'context-menu'}}>Description</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {teamList && teamList.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.image_url !== undefined ? (
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url} width="150px"
                                                 height="100px"/>) : (
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                 width="150px"
                                                 height="100px"/>)}</td>
                                        <td>{value.name}</td>
                                        <td>{value.description}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-primary" key={index}
                                                    onClick={event => {
                                                        this.getSpecificTeam(value.id)
                                                    }}>Edit
                                            </button>
                                            &nbsp;
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.removeSpecificTeam(value.id)
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
    const {manageTeamReducer} = state;
    debugger;
    return {
        Loading: manageTeamReducer.Loading,
        error_msg: manageTeamReducer.error_msg,
        success_msg: manageTeamReducer.success_msg,
        teamList: manageTeamReducer.teamList,
        reRender: true
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        teamAction: bindActionCreators(teamAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeam);


