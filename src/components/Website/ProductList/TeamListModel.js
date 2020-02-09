import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';
import './TeamListModelStyle.css';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
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
                                <div className="product">
                                    <div className="d-flex justify-content-center">
                                        <h4 className="p-2"
                                            style={{"textTransform": "capitalize"}}>{this.props.selectedProduct.title}({this.props.selectedProduct.sex}) </h4>
                                        <i className="fa fa-close" onClick={this.props.handleClose}></i>
                                    </div>
                                    <div className="products p-2">
                                        {this.props.TeamList.map((team, index) => (
                                            <div className="product_details d-flex align-items-center p-2 active"
                                                 onClick={() => this.props.SelectTeamMember(team)} key={index}>
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + team.image_url}>
                                                    <img className="img-fluid" alt="team1"/>
                                                    <img src="/assets/Images/NoImages.png" alt="team1"
                                                         className="img-fluid"/>
                                                    <img src="/assets/Images/s_loader.gif" alt="team1"
                                                         className="img-fluid"/>
                                                </ImageLoader>
                                                <h5 className="ml-2"
                                                    style={{"textTransform": "capitalize"}}>{team.first_name} {team.last_name}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <button className="btn addtocartbtn active" onClick={this.props.AddCart}
                                            disabled={!this.props.VisibleButton()}> Add Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default TeamListModel;
