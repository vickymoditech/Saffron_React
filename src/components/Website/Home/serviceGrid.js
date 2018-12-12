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
                    <div className="container mt-40">
                        <h3 className="text-center"></h3>
                        <div className="row mt-30">
                            {this.props.serviceList.length > 3 ? <Slider {...settings}>
                                    {this.props.serviceList.map((service, index) => (
                                        <div className="col-md-4 col-sm-6" key={index}>
                                            <div className="box16">
                                                <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + service.image_url}/>
                                                <div className="box-content">
                                                    <h3 className="title">{service.name}</h3>
                                                    <span className="post">{service.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider> :
                                this.props.serviceList.map((service, index) => (
                                    <div className="col-md-4 col-sm-6" key={index}>
                                        <div className="box16">
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + service.image_url}/>
                                            <div className="box-content">
                                                <h3 className="title">{service.name}</h3>
                                                <span className="post">{service.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ServiceGrid;