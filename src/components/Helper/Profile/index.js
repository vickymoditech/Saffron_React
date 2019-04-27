import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetLocalUderData} from '../../../index';
import * as authAction from '../../../actions/authAction';
import Loader from "../Loader/index";
import ChangePasswordModal from '../ChangePasswordModal';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class Profile extends Component {

    constructor(props) {
        super(props);
        const userProfile = GetLocalUderData().user;
        this.state = {
            userDetails: {
                filetoupload: "",
                userId: userProfile.userId,
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                mobile_number: userProfile.contact_no.toString(),
                emailAddress: userProfile.email_id,
                password: userProfile.password,
                confirm_password: userProfile.password,
                block: userProfile.block,
                image_url: userProfile.image_url,
                role: userProfile.role
            },
            image_url: userProfile.image_url !== "" && userProfile.image_url !== null ? ENVIRONMENT_VARIABLES.PHOTO_URL + userProfile.image_url : "",
            notificationSystem: null
        };
    }

    reagainFeelData = () => {
        const userProfile = GetLocalUderData().user;
        this.setState({
            userDetails: {
                filetoupload: "",
                userId: userProfile.userId,
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                mobile_number: userProfile.contact_no.toString(),
                emailAddress: userProfile.email_id,
                password: userProfile.password,
                confirm_password: userProfile.password,
                block: userProfile.block,
                image_url: userProfile.image_url,
                role: userProfile.role
            },
            image_url: userProfile.image_url !== "" && userProfile.image_url !== null ? ENVIRONMENT_VARIABLES.PHOTO_URL + userProfile.image_url : "",
            changePasswordDialog: false
        });
    };

    handleEditConfirm = () => {
        this.props.actions.authAction.updateUserProfile(this.state.userDetails);
    };


    handleChange = (event) => {
        const field = event.target.name;
        let userDetails = this.state.userDetails;
        userDetails[field] = event.target.value;
        return this.setState({userDetails: userDetails});
    };

    handleClose = () => {
        this.setState({changePasswordDialog: false});
    };

    handleOpen = () => {
        this.setState({changePasswordDialog: true});
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isPasswordChanged) {
            this.addNotifications(nextProps.successMsg, 'success');
            this.reagainFeelData();

        } else if (!nextProps.changePasswordLoading && nextProps.isPasswordChanged === false && nextProps.errMsg) {
            let message = nextProps.errMsg.toString().split(",");
            for (let i = 0; i < message.length; i++) {
                this.addNotifications(message[i], 'error');
            }
        }
    };

    handleSelectedFile = (event) => {
        const userDetails = this.state.userDetails;
        userDetails['filetoupload'] = event.target.files[0];
        this.setState({userDetails: userDetails, image_url: URL.createObjectURL(event.target.files[0])});
    };


    render() {
        const {emailAddress, mobile_number, first_name, last_name, userId, role} = this.state.userDetails;
        return (
            <div className="bg-burrito-image autofill-background">
                {this.state.changePasswordDialog && <ChangePasswordModal
                    handleClose={this.handleClose}
                    isOpen={this.state.changePasswordDialog}
                    notify={this.addNotifications}
                />}
                <NotificationSystem ref="notificationSystem"/>
                <div className="container tab-bg-container">
                    <div className="row">
                        <div className="form-wrapper col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">

                                        <div className="row">
                                            <div className="col-sm-6">
                                                {this.state.image_url !== undefined && this.state.image_url !== null && this.state.image_url !== "" ? (
                                                    <img
                                                        src={this.state.image_url}
                                                        width="150px"
                                                        height="150px"/>) : (
                                                    <img
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                        width="150px"
                                                        height="150px"/>)}
                                                <input type="file" onChange={this.handleSelectedFile}/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <span className="store-config-icon" title="First Name"> <img
                                                    src="/assets/Images/username.png" alt=""/> </span>
                                                <input type="text" className="form-control" name="first_name"
                                                       value={first_name}
                                                       placeholder="First Name" onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <span className="store-config-icon" title="Last Name"> <img
                                                    src="/assets/Images/username.png" alt=""/> </span>
                                                <input type="text" className="form-control" name="last_name"
                                                       value={last_name} placeholder="Last Name"
                                                       onChange={this.handleChange}/>
                                            </div>
                                        </div>

                                        <br/>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <span className="store-config-icon" title="UserId"> <img
                                                    src="/assets/Images/username.png" alt=""/> </span>
                                                <input type="text" className="form-control" name="userId"
                                                       value={userId}
                                                       placeholder="userId" disabled/>
                                            </div>
                                            <div className="col-sm-6">
                                                <span className="store-config-icon" title="mobile_number"> <img
                                                    src="/assets/Images/username.png" alt=""/> </span>
                                                <input type="text" className="form-control" name="mobile_number"
                                                       value={mobile_number} placeholder="Contact No"
                                                       onChange={this.handleChange}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <span className="store-config-icon" title="Email"> <img
                                            src="/assets/Images/email.png" alt=""/> </span>
                                        <input type="text" className="form-control" value={emailAddress}
                                               name="emailAddress" placeholder="Email" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12 text-right button-div">
                                        <a className="btn btn-save" onClick={this.handleEditConfirm}
                                           style={{cursor: 'pointer', marginRight: 10}}>Update User</a>
                                        <a className="btn btn-save" onClick={this.handleOpen}
                                           style={{cursor: 'pointer', float: 'right'}}>Change Password</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.props.changePasswordLoading && <Loader/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {authReducer} = state;
    return {
        changePasswordLoading: authReducer.changePasswordLoading,
        isPasswordChanged: authReducer.isPasswordChanged,
        successMsg: authReducer.successMsg,
        errMsg: authReducer.errMsg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        authAction: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);