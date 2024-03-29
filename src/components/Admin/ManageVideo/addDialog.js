import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as videoAction from '../../../actions/videoAction';
import {Dropdown} from 'semantic-ui-react';

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

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            image_url: null,
            selectedServiceId: null,
            selectedSex: null,
            commonData: {
                video_url: "",
                title: "",
                description: "",
                service_id: null,
                sex: 'male',
                selectedServiceId: this.props.selectedServiceId
            }
        };
    }

    handleChange = (event) => {
        const field = event.target.name;
        const commonData = this.state.commonData;
        commonData[field] = event.target.value;
        return this.setState({commonData: commonData});
    };

    handleSave = () => {
        if (this.state.commonData.image_url !== "" && this.state.commonData.image_url !== null && this.state.commonData.description !== "" && this.state.commonData.title !== "" && this.state.commonData.service_id !== null && this.state.commonData.sex !== null) {
            this.props.actions.videoAction.AddVideo(this.state.commonData);
        } else {
            this.props.notify("All the fields are required", 'error');
        }
    };

    handleChangeService = (event, {value}) => {
        if (value !== null) {
            const commonData = this.state.commonData;
            commonData['service_id'] = value;
            this.setState({commonData: commonData});
        }
    };

    onChange = (event) => {
        const commonData = this.state.commonData;
        commonData['sex'] = event.target.value;
        this.setState({commonData: commonData});
    };

    render() {
        const {sex} = this.state.commonData;
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
                                        <h2>Add New Video</h2>
                                    </div>
                                    <div className="panel-body container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                <form>
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <Dropdown placeholder="Select Service" fluid selection
                                                                          options={this.props.serviceList}
                                                                          style={{width: '342px'}}
                                                                          onChange={this.handleChangeService}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon d-flex align-items-center pr-4">
                                                                    <i className="fa fa-pencil"/>
                                                                </span>
                                                                <input type="text" name="title"
                                                                       placeholder="Video Title"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.title}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon d-flex align-items-center pr-4">
                                                                    <i className="fa fa-pencil"/>
                                                                </span>
                                                                <input type="text" name="description"
                                                                       placeholder="Description"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.description}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon d-flex align-items-center pr-4">
                                                                    <i className="fa fa-pencil"/>
                                                                </span>
                                                                <input type="text" name="video_url"
                                                                       placeholder="Video URL"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.video_url}/>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <div className="input-group d-flex justify-content-center">
                                                                <div>
                                                                <input type="radio" name="gender" value="male"
                                                                       onClick={this.onChange}
                                                                       checked={sex === 'male'}/> <b
                                                                style={{'cursor': 'default'}}> Male </b> &nbsp;
                                                                </div>
                                                                <div>
                                                                <input type="radio" name="gender" value="female"
                                                                       onClick={this.onChange}
                                                                       checked={sex === 'female'}/> <b
                                                                style={{'cursor': 'default'}}> Female </b>
                                                                </div>
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
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        videoAction: bindActionCreators(videoAction, dispatch),
    }
});


export default connect(null, mapDispatchToProps)(AddDialog);