import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class Team extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section class="team">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                                <div class="col-lg-12">
                                    <h6 class="description">OUR TEAM</h6>
                                    <div class="row pt-md">
                                        {this.props.teamList.map((team, index) => (
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
                                                <div class="img-box">
                                                    <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url}
                                                         class="img-responsive"/>
                                                    <ul class="text-center">
                                                        <a href="#">
                                                            <li><i class="fa fa-facebook"></i></li>
                                                        </a>
                                                        <a href="#">
                                                            <li><i class="fa fa-twitter"></i></li>
                                                        </a>
                                                        <a href="#">
                                                            <li><i class="fa fa-linkedin"></i></li>
                                                        </a>
                                                    </ul>
                                                </div>
                                                <h1>{team.name}</h1>
                                                <p>{team.description}</p>
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

export default Team;