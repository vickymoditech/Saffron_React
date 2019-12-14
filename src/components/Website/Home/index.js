import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactPlayer from 'react-player';
import ImageGrid from './imageGrid';
import MainSlider from './slider';
import ServiceGrid from './serviceGrid';
import MiddleCard from './middleCard';
import Team from './team';
import Footer from '../Footer';
import './websiteCss/website.css';

class Home extends Component {

    render() {
        return (
            <div>
                <div className="overlay"></div>
                <video playsInline="playsinline" autoPlay="autoplay" muted="muted" className="w-100" loop="loop">
                    <source src="assets/Video/saffron.webm" type="video/webm"/>
                </video>
                <ServiceGrid serviceList={this.props.serviceList}/>
                <MiddleCard/>
                <ImageGrid galleryList={this.props.galleryList}/>
                {this.props.sliderList.length > 0 && <MainSlider sliderList={this.props.sliderList}/>}
                <Team teamList={this.props.teamList}/>
                <Footer/>
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


export default connect(mapStateToProps, null)(Home);

