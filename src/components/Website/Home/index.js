import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageGrid from './imageGrid';
import MainSlider from './slider';
import ServiceGrid from './serviceGrid';
import MiddleCard from './middleCard';
import Team from './team';
import {bindActionCreators} from "redux";
import * as websiteAction from "../../../actions/websiteAction";

class Home extends Component {

    componentDidMount() {
        this.props.actions.websiteAction.basketVisible(true);
    }

    render() {
        return (
            <div className="mt-5 pt-md-4 pt-3">
                <div className="overlay"></div>
                <video playsInline="playsinline" autoPlay="autoplay" muted="muted" className="w-100" loop="loop">
                    <source src="assets/Video/saffron.webm" type="video/webm"/>
                </video>
                <ServiceGrid serviceList={this.props.serviceList}/>
                <MiddleCard/>
                <ImageGrid galleryList={this.props.galleryList}/>
                {this.props.sliderList.length > 0 && <MainSlider sliderList={this.props.sliderList}/>}
                <Team teamList={this.props.teamList}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        teamList: websiteReducer.teamList,
        serviceList: websiteReducer.serviceList,
        galleryList: websiteReducer.galleryList,
        sliderList: websiteReducer.sliderList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

