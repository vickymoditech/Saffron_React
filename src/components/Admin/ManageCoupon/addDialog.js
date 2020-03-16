import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CouponAction from '../../../actions/couponAction';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
let moment = require('moment-timezone');

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
        let currentStartDate = moment().tz('Asia/Kolkata').startOf('day').format();
        let currentEndDate = moment().tz('Asia/Kolkata').endOf('day').format();
        this.state = {
            isOpen: props.isOpen,
            commonData: {
                name: "",
                info: "",
                percentage: "",
                minPrice: "",
                maxPrice: "",
                maxDiscount: "",
                startDate: new Date(currentStartDate),
                endDate: new Date(currentEndDate),
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
        if (this.state.commonData.name !== "" && this.state.commonData.info !== "" && this.state.commonData.percentage !== "" && this.state.commonData.minPrice !== "" && this.state.commonData.maxPrice !== "" && this.state.commonData.maxDiscount !== "" && this.state.commonData.startDate !== "" && this.state.commonData.endDate !== null) {
            this.props.actions.CouponAction.AddCoupon(this.state.commonData);
        } else {
            console.log(this.state.commonData);
            this.props.notify("All fields are required", 'error');
        }
    };

    onChangeStartTime = (event, date) => {
        const commonData = this.state.commonData;
        commonData["startDate"] = date;
        return this.setState({commonData: commonData});
    };

    onChangeEndTime = (event, date) => {
        const commonData = this.state.commonData;
        commonData["endDate"] = date;
        return this.setState({commonData: commonData});
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
                                                                <span
                                                                    className="input-group-addon d-flex justify-content-center">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="text" name="name"
                                                                           placeholder="Coupon Name"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.name}/>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span
                                                                    className="input-group-addon d-flex justify-content-center">
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
                                                                <span
                                                                    className="input-group-addon d-flex justify-content-center">
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
                                                                <span
                                                                    className="input-group-addon d-flex justify-content-center">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="minPrice"
                                                                           placeholder="Minimum Price"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.minPrice}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span
                                                                    className="input-group-addon d-flex justify-content-center">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="maxPrice"
                                                                           placeholder="Maximum Price"
                                                                           className="form-control"
                                                                           style={{borderBottom: '0'}}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.maxPrice}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                <span
                                                                    className="input-group-addon d-flex justify-content-center">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                    <input type="number" name="maxDiscount"
                                                                           placeholder="Maximum Discount"
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
                                                            <div>
                                                                <div className="d-flex align-items-center">
                                                                    <label className="w-25">Start Date</label>
                                                                    <DatePicker hintText="Starting Date"
                                                                                value={this.state.commonData.startDate}
                                                                                onChange={this.onChangeStartTime}/>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <label className="w-25">Start Date</label>
                                                                    <DatePicker hintText="Ending Date"
                                                                                value={this.state.commonData.endDate}
                                                                                onChange={this.onChangeEndTime}/>
                                                                </div>
                                                            </div>
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
        CouponAction: bindActionCreators(CouponAction, dispatch),
    }
});


export default connect(null, mapDispatchToProps)(AddDialog);
