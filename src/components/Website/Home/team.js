import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class Team extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="team_section py-5">
                    <div className="container">
                        <div className="text-center">
                            <span className="main_title1">Our Team</span>
                        </div>
                        <div className="row">
                            {this.props.teamList.map((team, index) => (
                                <div className="col-xl-3 col-md-3 col-sm-6 col-12 team_position mt-3" key={index}>
                                    <div className="team">
                                        <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url} alt="team1" className="img-fluid team_img"/>
                                        <div className="team_img_content">
                                            <div className="team_content d-flex">
                                                <div className="team_text2">{team.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="team_text1">{team.first_name} {team.last_name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default Team;
