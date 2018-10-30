import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {ToastContainer, toast} from 'react-toastify';
import {browserHistory} from 'react-router';

import 'react-toastify/dist/ReactToastify.min.css';
import Loader from '../Helper/Loader';
import * as authAction from '../../actions/authAction';

import './login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {credentials: {email: '', password: ''}, isEmpty: false, invalidUser: false, toastId: ""}
    }

    notify = (message) => toast.error(message);


    removeToaster(toastId) {
        toast.dismiss(toastId);
        this.setState({toastId: ""})
    };

    handleChange = (event) => {
        this.setState({isEmpty: false, invalidUser: false});
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({credentials: credentials});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.state.toastId && this.removeToaster(this.state.toastId);
        if (this.state.credentials.email.trim() !== "" && this.state.credentials.password.trim() !== "") {
            this.props.actions.auth.loginUser(this.state.credentials);
        } else {
            let toastId = this.notify("Please Enter Username and Password");
            this.setState({toastId: toastId});
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.invalidUser) {
            let toastId = this.notify(nextProps.error_msg);
            this.setState({toastId: toastId});
        }
        if (nextProps.isAuthenticated) {
            browserHistory.push('/Dashboard');
        }
    }

    render() {
        return (
            <div className="vertical-alignment-helper">
                <ToastContainer
                    position="top-right"
                    type="default"
                    autoClose={6000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
                <div className="modal-dialog vertical-alignment-center">
                    <div className="modal-content">
                        <a href="javascript:void(0);" className="logo"></a>
                        <div className="modal-body">
                            <div className="row login-form">
                                <div className="col-xs-12 text-center">
                                    <h2 style={{margin:'10px'}}>User Authentication</h2>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-offset-1 col-md-10">
                                            <form>
                                                <div id="loginForm">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="fa fa-user"></i>
                                                        </span>
                                                            <input type="text" value={this.state.credentials.email}
                                                                   name="email" placeholder="Mobile Number"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="fa fa-lock"></i></span>
                                                            <input type="password"
                                                                   value={this.state.credentials.password}
                                                                   name="password" placeholder="Password"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                        <div className="forgot-link">
                                                            <Link to="forgot-password"
                                                                  style={{textDecoration: 'underline'}}>Forgot
                                                                Password?</Link>
                                                        </div>
                                                        <div className="form-group text-center row">
                                                            <div className="col-xs-12 text-center">
                                                            </div>
                                                            <button type="submit" className="btn btn-save"
                                                                    onClick={this.handleSubmit}>Sign In
                                                            </button>
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
                {this.props.loading && <Loader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {authReducer} = state;
    return {
        invalidUser: authReducer.invalidUser,
        loading: authReducer.loading,
        error_msg: authReducer.error_msg,
        isAuthenticated: authReducer.isAuthenticated,
        unAuthorized: authReducer.unAuthorized
    }
};

const mapDispatchToProps = dispatch => ({
    actions: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)


