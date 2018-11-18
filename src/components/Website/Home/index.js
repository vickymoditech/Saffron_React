import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authAction from '../../../actions/authAction';
import {isLoggedIn} from '../../../index';

import {browserHistory} from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class Home extends Component {

    handleLogout = () => {
        this.props.actions.auth.loggedOut();
    };

    handleLogin = () => {
        browserHistory.push('/Login');
    };

    render() {

        return (
            <div>
                <Carousel infiniteLoop={true} showThumbs={false} autoPlay={true} stopOnHover={false}>
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


                <div class="container mt-40">
                    <h3 class="text-center"></h3>
                    <div class="row mt-30">
                        {this.props.teamList.map((team, index) => (
                            <div class="col-md-4 col-sm-6">
                                <div class="box16">
                                    <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url}/>
                                    <div class="box-content">
                                        <h3 class="title">{team.name}</h3>
                                        <span class="post">{team.description}</span>
                                        <ul class="social">
                                            <li><a href=""><i class="fa fa-facebook"></i></a></li>
                                            <li><a href=""><i class="fa fa-twitter"></i></a></li>
                                            <li><a href=""><i class="fa fa-instagram"></i></a></li>
                                            <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/*<div class="container mt-40">*/}
                    {/*<h3 class="text-center"></h3>*/}
                    {/*<div class="row mt-30">*/}
                        {/**/}
                    {/*</div>*/}
                {/*</div>*/}


                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class="serviceBox">
                                <div class="service-image">
                                    <a href="#">
                                        <img src="assets/images/service.png" alt=""/>
                                    </a>
                                </div>
                                <div class="service-content">
                                    <h3>Lorem ipsum</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat elit sed est semper, ultricies maximus odio tempor. Ut viverra felis neque.
                                    </p>
                                </div>
                                <div class="read">
                                    <a href="#">learn more</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-sm-6">
                            <div class="serviceBox">
                                <div class="service-image">
                                    <a href="#">
                                        <img src="assets/images/service.png" alt=""/>
                                    </a>
                                </div>
                                <div class="service-content">
                                    <h3>Lorem ipsum</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat elit sed est semper, ultricies maximus odio tempor. Ut viverra felis neque.
                                    </p>
                                </div>
                                <div class="read">
                                    <a href="#">learn more</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                {isLoggedIn() ?
                    (<button onClick={this.handleLogout}>Logout</button>) :
                    (<button onClick={this.handleLogin}>Login</button>)}
            </div>

        );

    }

}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    debugger;
    return {
        teamList: websiteReducer.teamList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

