import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';

class HappyClient extends Component {
    render() {
        return (
            <div>
                <section className="testimonial my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <ImageLoader src="assets/Images/work-7.jpg">
                                    <img className="img-fluid d-md-block d-none testi_img wow fadeInLeft" alt={ENVIRONMENT_VARIABLES.PREFIX}/>
                                    <img className="img-fluid d-md-block d-none testi_img wow fadeInLeft" src="/assets/Images/NoImages.png" alt={ENVIRONMENT_VARIABLES.PREFIX}/>
                                    <img className="img-fluid d-md-block d-none testi_img wow fadeInLeft" src="/assets/Images/s_loader.gif" alt={ENVIRONMENT_VARIABLES.PREFIX}/>
                                </ImageLoader>
                            </div>
                            <div className="col-md-7">
                                <div className="d-flex justify-content-center py-md-0 py-3 flex-column h-100 wow fadeInRight">
                                    <div className="mt-3 text-center"><span className="title">Happy Customers</span>
                                    </div>
                                    <div id="customers-testimonials" className="owl-carousel d-flex">
                                        <div className="item m-1 p-2">
                                            <div className="d-flex flex-column align-items-center">
                                                <ImageLoader
                                                    src="assets/Images/stylist-1.jpg">
                                                    <img className="img-fluid" alt="image" style={{
                                                        height: '100px',
                                                        width: '100px',
                                                        borderRadius: '50%'
                                                    }}/>
                                                    <img src="/assets/Images/NoImages.png"
                                                         className="img-fluid"
                                                         style={{height: '100px', width: '100px',borderRadius: '50%'}}
                                                         alt={ENVIRONMENT_VARIABLES.PREFIX}/>
                                                    <img src="/assets/Images/s_loader.gif"
                                                         className="img-fluid"
                                                         style={{height: '100px', width: '100px',borderRadius: '50%'}}
                                                         alt={ENVIRONMENT_VARIABLES.PREFIX}/>
                                                </ImageLoader>
                                                <div className="d-flex flex-column text-center mt-3 mb-3">
                                                    <span className="cutsomer_title">Jeff Nucci</span>
                                                    <span>Businessman</span>
                                                </div>
                                                <p className="text-center">Far far away, behind the word mountains, far
                                                    from the countries Vokalia and Consonantia, there live the blind
                                                    texts.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HappyClient;
