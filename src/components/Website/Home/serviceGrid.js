import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import './websiteCss/serviceStyle.css';
import ImageLoader from 'react-load-image';

class ServiceGrid extends Component {

    render() {
        return (
            <div>
                <section className="service pt-5 pb-5">
                    <div className="container-fluid">
                        <div className="title_content text-center mb-5">
                            <span className="title">Our Services</span>
                        </div>

                        <div className="row">
                            <div className="col-md-4 col-sm-5 pr-0">
                                <div className="d-flex flex-column align-items-center ml-xl-5 pl-xl-5">
                                    <img src="assets/Images/work-7.jpg" className="img-fluid" alt="service image"/>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-5">
                                <div className="services_main_box">
                                    <div className="row">
                                        {this.props.serviceList.map((service, index) => (
                                            <div key={index} className="col-md-6">
                                                <div className="main_box d-flex p-2 m-2">
                                                    <ImageLoader
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + service.image_url}>
                                                        <img className="img-fluid" alt={service.title}/>
                                                        <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                             alt={service.title}/>
                                                        <img src="/assets/Images/s_loader.gif" className="img-fluid"
                                                             alt={service.title}/>
                                                    </ImageLoader>
                                                    <div className="ml-2">
                                                        <h5 style={{"textTransform": "capitalize"}} >{service.title}</h5>
                                                        <p style={{"textTransform": "capitalize"}}>{service.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ServiceGrid;
