import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {GetLocalUderData} from '../../../index';
import * as authAction from '../../../actions/authAction';
import Loader from "../Loader/index";
import ChangePasswordModal from '../ChangePasswordModal';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import SuccessLoader from '../SuccessLoader/index';
import ImageLoader from 'react-load-image';
import button from './profile.css';

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
                emailAddress: userProfile.email_id ? userProfile.email_id : "",
                password: userProfile.password,
                confirm_password: userProfile.password,
                block: userProfile.block,
                image_url: userProfile.image_url,
                role: userProfile.role
            },
            image_url: userProfile.image_url !== "" && userProfile.image_url !== null ? ENVIRONMENT_VARIABLES.PHOTO_URL + userProfile.image_url : "",
            notificationSystem: null,
            successLoader: false,
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
        let check = true;
        if (!/^[a-zA-Z]+$/.test(this.state.userDetails.first_name.trim())) {
            this.addNotifications("Invalid First Name; must be character", 'error');
            check = false;
        }
        if (!/^[a-zA-Z]+$/.test(this.state.userDetails.last_name.trim())) {
            this.addNotifications("Invalid Last Name; must be character", 'error');
            check = false;
        }
        if (!/^\d{10}$/.test(this.state.userDetails.mobile_number.trim())) {
            this.addNotifications("Invalid Phone Number; must be 10 digits", 'error');
            check = false;
        }
        if (check) {
            this.props.actions.authAction.updateUserProfile(this.state.userDetails);
        }
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
            position: 'bc',
            autoDismiss: 25
        });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isPasswordChanged && nextProps.successMsg) {
            this.setState({successLoader: true}, () => {
                setTimeout(() => {
                    this.setState({successLoader: false});
                }, 1000);
            });
            this.props.actions.authAction.DefaultMessageClear();
            this.reagainFeelData();
        } else if (!nextProps.changePasswordLoading && !nextProps.isPasswordChanged && nextProps.error_msg) {
            let message = nextProps.error_msg.toString().split(",");
            for (let i = 0; i < message.length; i++) {
                this.addNotifications(message[i], 'error');
                this.props.actions.authAction.DefaultMessageClear();
            }
        }
    };

    handleSelectedFile = (event) => {
        const userDetails = this.state.userDetails;
        userDetails['filetoupload'] = event.target.files[0];
        this.setState({userDetails: userDetails, image_url: URL.createObjectURL(event.target.files[0])});
    };

    render() {
        const {emailAddress, mobile_number, first_name, last_name, userId} = this.state.userDetails;
        return (
            <div className="autofill-background">
                {this.state.changePasswordDialog && <ChangePasswordModal
                    handleClose={this.handleClose}
                    isOpen={this.state.changePasswordDialog}
                    notify={this.addNotifications}
                />}
                <NotificationSystem ref="notificationSystem"/>
                <div className="modal-dialog d-flex align-items-center w-100">
                    <div className="modal-content my-3">
                        <div className="modal-body pt-2">
                            <div className="row login-form">
                                <div className="panel-body container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center">
                                                <form className="w-100">
                                                    <div id="loginForm">
                                                        <div className="form-group d-flex flex-column align-items-center">
                                                            <ImageLoader
                                                                src={this.state.image_url}>
                                                                <img className="img-fluid"
                                                                     style={{height: '100px', width: '100px',borderRadius:'50px'}}
                                                                     alt="image"/>
                                                                <img src="/assets/Images/NoImages.png"
                                                                     style={{height: '100px', width: '100px'}}
                                                                     alt="image"/>
                                                                <img src="/assets/Images/s_loader.gif"
                                                                     style={{height: '100px', width: '100px'}}
                                                                     alt="image"/>
                                                            </ImageLoader>
                                                            <input type="file" accept="image/*"
                                                                   onChange={this.handleSelectedFile}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center">
                                                            <i className="fa fa-user icon_color"></i>
                                                        </span>
                                                                <input type="text" className="form-control"
                                                                       name="first_name"
                                                                       value={first_name}
                                                                       placeholder="First Name"
                                                                       onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center">
                                                            <i className="fa fa-user icon_color"></i>
                                                        </span>
                                                                <input type="text" className="form-control"
                                                                       name="last_name"
                                                                       value={last_name} placeholder="Last Name"
                                                                       onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center">
                                                            <i className="fa fa-mobile icon_color"></i>
                                                        </span>
                                                                <input type="number" className="form-control"
                                                                       name="mobile_number"
                                                                       value={mobile_number} placeholder="Contact No"
                                                                       onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center">
                                                            <i className="fa fa-key icon_color"></i>
                                                        </span>
                                                                <input type="number" className="form-control"
                                                                       name="userId"
                                                                       value={userId}
                                                                       placeholder="userId" disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center">
                                                            <i className="fa fa-envelope-o icon_color"></i>
                                                        </span>
                                                                <input type="email" className="form-control"
                                                                       value={emailAddress}
                                                                       name="emailAddress" placeholder="Email"
                                                                       onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div
                                                                className="col-sm-12 text-center button-div mt-3 d-flex justify-content-center">
                                                                <a className="text-white mr-3 button_main_profile p-3"
                                                                   onClick={this.handleEditConfirm}
                                                                >Update User</a>
                                                                <a className="text-white button_main_profile p-3"
                                                                   onClick={this.handleOpen}
                                                                >Change Password</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.changePasswordLoading && <Loader/>}
                {this.state.successLoader && <SuccessLoader/>}
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
        error_msg: authReducer.error_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        authAction: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
