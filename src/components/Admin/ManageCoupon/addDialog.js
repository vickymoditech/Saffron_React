import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as videoAction from '../../../actions/videoAction';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    }
};

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            selectedDate: new Date(),
            commonData: {
                name: "",
                info: "",
                percentage: "",
                minPrice: "",
                maxPrice: "",
                maxDiscount: "",
                startDate: "",
                endDate: "",
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
        alert("save button Login here");
        // if (this.state.commonData.image_url !== "" && this.state.commonData.image_url !== null && this.state.commonData.description !== "" && this.state.commonData.title !== "" && this.state.commonData.service_id !== null && this.state.commonData.sex !== null) {
        //     this.props.actions.videoAction.AddVideo(this.state.commonData);
        // } else {
        //     this.props.notify("All the fields are required", 'error');
        // }
    };

    onChange = (event, date) => {
        alert(date);
    };

    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    modal={false}
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
                                        <h2 className="title" className="mb-3">Add New Coupon</h2>
                                    </div>
                                    <div className="panel-body container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                    <form className="w-100">
                                                        <div id="loginForm">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="text" name="name"
                                                                           placeholder="Title"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.name}/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="text" name="info"
                                                                           placeholder="Description"
                                                                           className="form-control"
                                                                           onChange={this.handleChange}
                                                                           style={{borderBottom: '0'}}
                                                                           value={this.state.commonData.info}/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="percentage"
                                                                           placeholder="Percentage"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.percentage}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="minPrice"
                                                                           placeholder="MinPrice"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.minPrice}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="maxPrice"
                                                                           placeholder="MaxPrice"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.maxPrice}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="maxDiscount"
                                                                           placeholder="MaxDiscount"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.maxDiscount}/>
                                                                </div>
                                                            </div>

                                                            <Checkbox
                                                                label="Do you want to send Notification to all Customer"
                                                                labelPosition="left"
                                                                checked={true}
                                                            />

                                                            <DatePicker hintText="Starting Date"
                                                                        value={this.state.selectedDate}
                                                                        onChange={this.onChange}/>

                                                            <DatePicker hintText="Ending Date"
                                                                        value={this.state.selectedDate}
                                                                        onChange={this.onChange}/>

                                                            <div className="form-group">
                                                                <div className="form-group text-center row">
                                                                    <div className="col-xs-12 text-center">
                                                                        <button type="button" className="button_main"
                                                                                style={{margin: '12px 10px 0 0'}}
                                                                                onClick={this.handleSave}>Save
                                                                        </button>
                                                                        <button type="button" className="button_main"
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
