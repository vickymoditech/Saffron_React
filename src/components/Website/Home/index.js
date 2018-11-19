import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authAction from '../../../actions/authAction';
import {isLoggedIn} from '../../../index';

import {browserHistory} from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ImageGrid from './imageGrid';
import MainSlider from './slider';
import ServiceGrid from './serviceGrid';
import MiddleCard from './middleCard';
import Team from './team';

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

                <MainSlider/>
                <ServiceGrid serviceList={this.props.serviceList}/>
                <MiddleCard/>
                <ImageGrid galleryList={this.props.galleryList}/>
                <Team teamList={this.props.teamList}/>

                {isLoggedIn() ?
                    (<button onClick={this.handleLogout}>Logout</button>) :
                    (<button onClick={this.handleLogin}>Login</button>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        teamList: websiteReducer.teamList,
        serviceList: websiteReducer.serviceList,
        galleryList: websiteReducer.galleryList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

