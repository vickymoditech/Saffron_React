import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authAction from '../../../actions/authAction';
import './changePassword.css';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    }
};

class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordData: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            changePasswordLoading: false,
            isPasswordChanged: false,
            isOpen: props.isOpen
        };
    }

    handleChange = (event) => {
        const field = event.target.name;
        const changePasswordData = this.state.changePasswordData;
        changePasswordData[field] = event.target.value;
        return this.setState({changePasswordData: changePasswordData});
    };

    handleSubmit = () => {
        const {currentPassword, newPassword, confirmPassword} = this.state.changePasswordData;
        if (currentPassword.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "") {
            this.props.notify("All Fields are Required Please check it.", 'error');
        }
        else if (newPassword.trim() !== confirmPassword.trim()) {
            this.props.notify("New Password and Confirm Password are must be same", 'error');
        }
        else {
            this.setState({changePasswordLoading: true});
            this.props.actions.authAction.changePassword(this.state.changePasswordData);
        }
    };


    componentWillReceiveProps(nextProps) {
        let initData = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
        if (this.state.isOpen !== nextProps.isOpen) this.setState({isOpen: nextProps.isOpen});
        if (!this.state.isOpen) this.setState({changePasswordData: initData});
        this.setState({changePasswordLoading: nextProps.changePasswordLoading});
        if (nextProps.isPasswordChanged) {
            this.setState({isOpen: false});
            this.props.handleClose();
            this.props.notify(nextProps.successMsg, 'success');
            this.setState({changePasswordData: initData});
        } else if (!nextProps.changePasswordLoading && nextProps.isPasswordChanged === false && nextProps.errMsg) {
            let message = nextProps.errMsg.toString().split(",");
            for (let i = 0; i < message.length; i++) {
                this.props.notify(message[i], 'error');
            }

        }
    };


    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.state.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row login-form">
                                    <div className="col-xs-12 text-center">
                                        <h2 className="title">Change Password</h2>
                                        <br/>
                                    </div>
                                    <div className="panel-body container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                    <form className="w-100">
                                                        <div id="loginForm">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-lock icon_color"/>
                                                                </span>
                                                                    <input type="password" name="currentPassword"
                                                                           placeholder="Current Password"
                                                                           className="form-control"
                                                                           onChange={this.handleChange}
                                                                           value={this.state.changePasswordData.currentPassword}/>
                                                                </div>

                                                            </div>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-key icon_color"/>
                                                                </span>
                                                                    <input type="password" name="newPassword"
                                                                           placeholder="New Password"
                                                                           className="form-control"
                                                                           onChange={this.handleChange}
                                                                           value={this.state.changePasswordData.newPassword}/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-key icon_color"/>
                                                                </span>
                                                                    <input type="password" name="confirmPassword"
                                                                           placeholder="Confirm Password"
                                                                           className="form-control"
                                                                           onChange={this.handleChange}
                                                                           value={this.state.changePasswordData.confirmPassword}/>
                                                                </div>
                                                                <div className="form-group text-center row">
                                                                    <div className="col-xs-12 text-center">
                                                                        <button type="button" className="button_main"
                                                                                style={{margin: '12px 10px 0 0'}}
                                                                                onClick={this.handleSubmit}>Submit
                                                                        </button>
                                                                        <button type="button" className="button_main"
                                                                                style={{margin: '12px 10px 0 0'}}
                                                                                onClick={this.props.handleClose}>Cancel
                                                                        </button>
                                                                    </div>
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
                </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal);