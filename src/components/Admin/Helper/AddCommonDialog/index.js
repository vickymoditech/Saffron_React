import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as serviceAction from '../../../../actions/serviceAction';
import * as teamAction from '../../../../actions/teamAction';


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

class ProductDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            commonData: {
                filetoupload: "",
                title: "",
                description: "",
                displayOrder: 1
            }
        };
    }

    handleselectedFile = (event) => {
        const commonData = this.state.commonData;
        commonData['filetoupload'] = event.target.files[0];
        this.setState({commonData: commonData});
    };

    handleChange = (event) => {
        const field = event.target.name;
        const commonData = this.state.commonData;
        commonData[field] = event.target.value;
        return this.setState({commonData: commonData});
    };

    handleSave = () => {
        if (this.state.commonData.filetoupload !== "" && this.state.commonData.filetoupload !== null && this.state.commonData.description !== "" && this.state.commonData.title !== "") {
            if (this.props.status === "service") {
                this.props.actions.serviceAction.AddService(this.state.commonData);
            } else if (this.props.status === "team") {
                this.props.actions.teamAction.AddTeam(this.state.commonData);
            }
        } else {
            this.props.notify("All the fields are required", 'error');
        }
    };

    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.state.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row login-form">
                                    <div className="col-xs-12 text-center">
                                        <h2>Change Password</h2>
                                        <br/>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                <input type="file" onChange={this.handleselectedFile}/>
                                                <form>
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-lock"/>
                                                                </span>
                                                                <input type="text" name="title"
                                                                       placeholder="Service Title"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.title}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-key"/>
                                                                </span>
                                                                <input type="text" name="description"
                                                                       placeholder="Service Description"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.description}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center">
                                                                    <button type="button" className="btn btn-save"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.handleSave}>Save
                                                                    </button>
                                                                    <button type="button" className="btn btn-save"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.props.handleClose}>Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        serviceAction: bindActionCreators(serviceAction, dispatch),
        teamAction: bindActionCreators(teamAction, dispatch)
    }
});


export default connect(null, mapDispatchToProps)(ProductDialog);