import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import './websiteCss/Team.css';

class Team extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="team">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="col-lg-12">
                                    <h6 className="description">OUR TEAM</h6>
                                    <div className="row pt-md">
                                        {this.props.teamList.map((team, index) => (
                                            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile" key={index}>
                                                <div className="img-box">
                                                    <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url}
                                                         className="img-responsive"/>
                                                    <ul className="text-center">
                                                        <a href="#">
                                                            <li><i className="fa fa-facebook"></i></li>
                                                        </a>
                                                        <a href="#">
                                                            <li><i className="fa fa-twitter"></i></li>
                                                        </a>
                                                        <a href="#">
                                                            <li><i className="fa fa-linkedin"></i></li>
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