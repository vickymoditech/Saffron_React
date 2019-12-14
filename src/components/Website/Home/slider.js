import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class MainSlider extends Component {

    constructor(props) {
        super(props);
        const data = [{
            image: "assets/Images/stylist-1.jpg",
            review: "first one",
            clientName: "first name"
        }, {
            image: "assets/Images/stylist-2.jpg",
            review: "second one",
            clientName: "first name"
        }, {
            image: "assets/Images/stylist-3.jpg",
            review: "third one",
            clientName: "first name"
        }];
        this.state = {happyClient: data, activeIndex: 0};

    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            if (this.state.activeIndex !== this.state.happyClient.length - 1)
                this.setState({activeIndex: this.state.activeIndex + 1});
            else
                this.setState({activeIndex: 0});
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const singleData = this.state.happyClient[this.state.activeIndex];
        return (
            <div>
                <section className="testimonial">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <img className="img-fluid" src="assets/Images/work-7.jpg" alt="testimonial image"/>
                            </div>
                            <div className="col-md-7">
                                <div className="d-flex justify-content-center flex-column h-100">
                                    <span className="title text-center">Happy Customers</span>
                                    <div id="customers-testimonials" className="owl-carousel mt-3 d-flex">
                                        <div className="item m-1 p-2">
                                            <div className="d-flex flex-column align-items-center">
                                                <img src="assets/Images/stylist-1.jpg" classname="img-fluid mt-2" style={{height:'100px',width:'100px',borderRadius:'50%'}} alt="customer image"/>
                                                    <div className="d-flex flex-column text-center mt-3 mb-3">
                                                        <span className="cutsomer_title">Jeff Nucci</span>
                                                        <span>Businessman</span>
                                                    </div>
                                                    <p className="text-center">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                            </div>
                                        </div>
                                        <div className="item m-1 p-2">
                                            <div className="d-flex flex-column align-items-center">
                                                <img src="assets/Images/stylist-2.jpg" classname="img-fluid mt-2" style={{height:'100px',width:'100px',borderRadius:'50%'}} alt="customer image"/>
                                                    <div className="d-flex flex-column text-center mt-3 mb-3">
                                                        <span className="cutsomer_title">Jeff Nucci</span>
                                                        <span>Businessman</span>
                                                    </div>
                                                    <p className="text-center">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                            </div>
                                        </div>
                                        <div className="item m-1 p-2">
                                            <div className="d-flex flex-column align-items-center">
                                                <img src="assets/Images/stylist-3.jpg" classname="img-fluid mt-2" style={{height:'100px',width:'100px',borderRadius:'50%'}} alt="customer image"/>
                                                    <div className="d-flex flex-column text-center mt-3 mb-3">
                                                        <span className="cutsomer_title">Jeff Nucci</span>
                                                        <span>Businessman</span>
                                                    </div>
                                                    <p className="text-center">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
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

export default MainSlider;
