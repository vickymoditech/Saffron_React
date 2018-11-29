import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import {GetLocalUderData} from '../../../index';

class Profile extends Component {

    constructor(props) {
        super(props);
        const userProfile = GetLocalUderData().user;
        console.log(userProfile);
        this.state = {
            userDetails: {
                firstName: userProfile.first_name,
                lastName: userProfile.last_name,
                mobile_number: userProfile.contact_no,
                emailAddress: userProfile.email_id,
                password: userProfile.password,
                confirm_password: userProfile.password,
                block: userProfile.block
            },
            notificationSystem: null
        };
    }

    handleEditConfirm = () => {
        alert("Edit Confirm");
    };


    handleChange = (event) => {
        const field = event.target.name;
        let userDetails = this.state.userDetails;
        userDetails[field] = event.target.value;
        return this.setState({userDetails: userDetails});
    };

    handleClear = () => {
        alert("clear");
    };

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };


    render() {
        const {emailAddress, mobile_number, firstName, lastName} = this.state.userDetails;
        return (
            <div className="bg-burrito-image autofill-background store-user-config">
                <NotificationSystem ref="notificationSystem"/>
                <div className="container tab-bg-container">
                    <div className="row">
                        <div className="form-wrapper col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <span className="store-config-icon" title="First Name"> <img
                                                    src="/assets/Images/username.png" alt=""/> </span>
                                                <input type="text" className="form-control" name="firstName"
                                                       value={firstName}
                                                       placeholder="First Name" onChange={this.handleChange}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <span className="store-config-icon" title="Last Name"> <img
                                                    src="/assets/Images/username.png" alt=""/> </span>
                                                <input type="text" className="form-control" name="lastName"
                                                       value={lastName} placeholder="Last Name"
                                                       onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="form-group">*/}
                                {/*<div className="col-sm-12">*/}
                                {/*<span className="store-config-icon" title="User Name"> <img*/}
                                {/*src="/assets/Images/username.png" alt=""/> </span>*/}
                                {/*<input type="text" className="form-control" value={userName}*/}
                                {/*name="userName" placeholder="User Name" onChange={this.handleChange}/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
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
                                        <a className="btn btn-save" onClick={this.handleClear}
                                           style={{cursor: 'pointer', float: 'right'}}>Clear</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;