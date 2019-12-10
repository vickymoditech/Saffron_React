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
                {/**/}

                <header>
                    <nav className="navbar navbar-expand-md navbar-dark navbar1 scrolled fixed-top pt-md-4" id="navbar">
                        <div
                            className="col-2 d-flex flex-column text-center d-md-none d-block align-items-md-center first_logo logo">
                            <i className="fa fa-camera"></i><span>IMAHE</span>
                        </div>
                        <div className="container main_menu d-flex justify-content-end">
                            <button className="navbar-toggler text-right" data-toggle="collapse"
                                    data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse menu" id="collapsibleNavbar">
                                <div className="col-md-5 menu1 text-right">
                                    <a href="index.html" className="mr-md-5">HOME</a>
                                    <a href="gallery.html" className="mr-md-5">GALLERY</a>
                                    <a href="service.html">SERVICES</a>
                                </div>
                                <div className="col-md-2 d-md-flex d-none flex-column align-items-md-center logo">
                                    <i className="fa fa-camera"></i><span>IMAHE</span>
                                </div>
                                <div className="col-md-5 menu2">
                                    <a href="#">BLOG</a>
                                    <a href="#" className="ml-md-5">ABOUT</a>
                                    <a href="#" className="ml-md-5">CONTACT</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="overlay"></div>
                    <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                        <source src="assets/Video/saffron.webm" type="video/webm"/>
                    </video>
                </header>

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

