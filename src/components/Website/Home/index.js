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
import ENVIRONMENT_VARIABLES from "../../../environment.config";


class Home extends Component {

    handleLogout = () => {
        this.props.actions.auth.loggedOut();
    };

    handleLogin = () => {
        browserHistory.push('/Login');
    };

    changeImageArrayFormate = (GalleryImages) => {
        let galleryList = [];
        GalleryImages.map((image, index) => {
            let dataSchema = {
                src: ENVIRONMENT_VARIABLES.PHOTO_URL + image.image_url,
                thumbnail: ENVIRONMENT_VARIABLES.PHOTO_URL + image.image_url,
                thumbnailWidth: 320,
                thumbnailHeight: 213,
                tags: [{value: image.description, title: "Nature"}],
                caption: image.description
            };
            galleryList.push(dataSchema);
        });
        return galleryList;
    };


    render() {
        return (
            <div>

                <MainSlider/>
                <ServiceGrid serviceList={this.props.serviceList}/>
                <MiddleCard/>
                <ImageGrid galleryList={this.changeImageArrayFormate(this.props.galleryList)}/>
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

