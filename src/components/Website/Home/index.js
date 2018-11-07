import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authAction from '../../../actions/authAction';
import {isLoggedIn} from '../../../index';

import {browserHistory} from 'react-router';

class Home extends Component {

    handleLogout = () => {
        this.props.actions.auth.loggedOut();
    };

    handleLogin = () => {
        browserHistory.push('/Login');
    };

    render() {

        return (

            <div>
                <h1> home page </h1>
                {isLoggedIn() ?
                    (<button onClick={this.handleLogout}>Logout</button>) :
                    (<button onClick={this.handleLogin}>Login</button>)}
            </div>

        );

    }

}

const mapDispatchToProps = dispatch => ({
    actions: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(Home);

