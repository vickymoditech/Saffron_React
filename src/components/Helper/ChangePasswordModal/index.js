import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authAction from '../../../actions/authAction';
import Loader from "../Loader/index";


const leftCloseButton = {
        //borderRadius: '50%',
        boxShadow: 'transparent',
        float: 'right',
        backgroundColor: 'transparent',
        //width: 43,
        //height: 43,
        //fontSize: 25,
        //fontFamily: 'FontAwesome',
        color: '#c53140',
        //marginTop: '-6px',
        //padding: "9px 12px"
};

const customContentStyle = {
    backgroundColor:'transparent',
    boxShadow:'transparent'
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

    handleClose = () => {
        let initData = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
        this.setState({changePasswordData: initData});
        this.props.handleClose();
    };

    handleSubmit = () => {
        const {currentPassword, newPassword, confirmPassword} = this.state.changePasswordData;
        if (currentPassword.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "") {
            this.props.notify("all Filed are Required", 'error');
        }
        else if (newPassword.trim() !== confirmPassword.trim()) {
            this.props.notify("new password and confirm password are must be same", 'error');
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
        }
        if (nextProps.isPasswordChanged) {
            this.props.notify(nextProps.successMsg, 'success');
            this.setState({changePasswordData: initData});
            this.setState({isOpen: false})
        } else if (nextProps.isPasswordChanged === false && nextProps.errMsg) {
            this.props.notify(nextProps.errMsg, 'error');
        }
    };

    render() {
        return (
            <div>
                <Dialog
                    modal={true}
                    open={this.state.isOpen}
                    onRequestClose={this.props.handleClose}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row login-form">
                                    <div className="col-xs-12 text-center">
                                        <h2>Change Password</h2>
                                        <br/>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                <form>
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-lock"/>
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
                                                                    <i className="fa fa-key"/>
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
                                                                    <i className="fa fa-key"/>
                                                                </span>
                                                                <input type="password" name="confirmPassword"
                                                                       placeholder="Confirm Password"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.changePasswordData.confirmPassword}/>
                                                            </div>
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center">
                                                                    <button type="button" className="btn btn-save"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.handleSubmit}>Submit
                                                                    </button>
                                                                    <button type="button" className="btn btn-save"
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
                </Dialog>
                {this.state.changePasswordLoading && <Loader/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {authReducer} = state;
    return {
        changePasswordLoading: authReducer.changePasswordLoading,
        isPasswordChanged:authReducer.isPasswordChanged,
        successMsg:authReducer.successMsg,
        errMsg:authReducer.errMsg
    }
};

const mapDispatchToProps = dispatch => ({
    actions: {
        authAction: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal);