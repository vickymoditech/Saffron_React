import React, {Component} from 'react';
import {connect} from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from 'react-player';
import ImageGrid from './imageGrid';
import MainSlider from './slider';
import ServiceGrid from './serviceGrid';
import MiddleCard from './middleCard';
import Team from './team';
import Footer from '../Footer';

class Home extends Component {

    render() {
        return (
            <div>
                <ReactPlayer url='assets/Video/saffron.webm' playing loop={true} muted width={"100%"} height={"100%"}/>
                {this.props.sliderList.length > 0 && <MainSlider sliderList={this.props.sliderList}/>}
                <ServiceGrid serviceList={this.props.serviceList}/>
                <MiddleCard/>
                <ImageGrid galleryList={this.props.galleryList}/>
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

