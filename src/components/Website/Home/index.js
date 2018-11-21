import React, {Component} from 'react';
import {connect} from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

                <MainSlider/>
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
        galleryList: websiteReducer.galleryList
    };
};


export default connect(mapStateToProps, null)(Home);

