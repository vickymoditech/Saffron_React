import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {Link} from 'react-router';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    },
    actionsContainerStyle: {
        textAlign: 'right',
        padding: '5 5'
    },
    leftCloseButton: {
        borderRadius: '50%',
        boxShadow: '0px 2px 9px -2px #000',
        float: 'right',
        backgroundColor: '#fff',
        width: 43,
        height: 43,
        fontSize: 25,
        fontFamily: 'FontAwesome',
        color: '#c53140',
        marginTop: '-6px',
        padding: "9px 12px"
    }
};


class TeamListModel extends Component {

    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.props.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">

                                {this.props.TeamList.map((team, index) => (
                                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 team_position mt-3" key={index}
                                         onClick={() => this.props.SelectTeamMember(team)}>
                                        <div className="team">
                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url} alt="team1"
                                                 className="img-fluid team_img"/>
                                        </div>
                                        <div className="team_text1">{team.first_name} {team.last_name}</div>
                                    </div>
                                ))}

                                {this.props.VisibleButton() && <button onClick={this.props.AddCart}> Add Cart</button>}
                                {this.props.isLogin() && <Link to="/login"><span> Sign in or create account
Already use Uber? Sign in with your account. </span></Link>}
                                <button onClick={this.props.handleClose}> Close</button>

                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default TeamListModel;