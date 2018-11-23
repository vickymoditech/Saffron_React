import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class MainSlider extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div>
                <Carousel infiniteLoop={true} showThumbs={false} autoPlay={true} stopOnHover={false} interval={3000}>
                    {this.props.sliderList.map((Slider, index) => (
                        <div>
                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + Slider.image_url} alt="" key={index}/>
                        </div>
                    ))}
                </Carousel>
            </div>

        );

    }


}

export default MainSlider;