import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';

class MainSlider extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div>
                <Carousel infiniteLoop={true} showThumbs={false} autoPlay={true} stopOnHover={false} interval={7000}>
                    <div>
                        <img src="assets/Images/01.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="assets/Images/01.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="assets/Images/01.jpg" alt=""/>
                    </div>
                    <div>
                        <img src="assets/Images/01.jpg" alt=""/>
                    </div>
                </Carousel>
            </div>

        );

    }


}

export default MainSlider;