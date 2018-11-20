import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import Slider from "react-slick";
import './websiteCss/Service.css';

class ServiceGrid extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            rtl: true
        };
        return (
            <div>
                <div>
                    <div class="container mt-40">
                        <h3 class="text-center"></h3>
                        <div class="row mt-30">
                            <Slider {...settings}>
                                {this.props.serviceList.map((service, index) => (
                                    <div class="col-md-4 col-sm-6" key={index}>
                                        <div class="box16">
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + service.image_url}/>
                                            <div class="box-content">
                                                <h3 class="title">{service.name}</h3>
                                                <span class="post">{service.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ServiceGrid;