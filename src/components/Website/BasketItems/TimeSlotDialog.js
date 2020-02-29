import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import './TimeSlotDialogStyle.css';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    }
};

class TimeSlotDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedTime: null, orderType: null, visible: false, selectedItem: null};
    }

    TimeSelectedClick = (singleData) => {
        const {orderType} = this.state;
        const selectedTime = {
            start_time: singleData.start_time,
            end_time: singleData.end_time
        };
        if (orderType)
            this.setState({selectedTime: selectedTime, selectedItem: singleData.id, visible: true});
        else
            this.setState({selectedTime: selectedTime, selectedItem: singleData.id});
    };

    placeOrder = () => {
        this.props.placeOrder(this.state.selectedTime, this.state.orderType);
    };

    onChange = (event) => {
        const {selectedTime} = this.state;
        if (selectedTime)
            this.setState({orderType: event.target.value, visible: true});
        else
            this.setState({orderType: event.target.value});
    };

    render() {
        const {orderType} = this.state;
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
                                            style={{"textTransform": "capitalize"}}> Choose Your Time </h4>
                                        <i className="fa fa-close" onClick={this.props.handleClose}></i>
                                    </div>

                                    <div className="products p-2">
                                        {this.props.TimeSlots.map((singleData, index) => (
                                            <div
                                                className={this.state.selectedItem === singleData.id ? "product-select d-flex align-items-center p-2" : "product_details d-flex align-items-center p-2"}
                                                onClick={() => this.TimeSelectedClick(singleData)} key={index}>
                                                <h5 className="ml-2"
                                                    style={{"textTransform": "capitalize"}}>{singleData.start_time} - {singleData.end_time}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div className="form-check-inline">
                                        <label className="form-check-label">
                                            <input type="radio" name="orderType" value="ASAP"
                                                   className="form-check-input"
                                                   onChange={this.onChange}
                                                   checked={orderType === 'ASAP'}/> <b
                                            style={{'cursor': 'default'}}> ASAP </b>
                                        </label>
                                    </div>
                                    <div className="form-check-inline">
                                        <label className="form-check-label">
                                            <input type="radio" name="orderType" value="10"
                                                   className="form-check-input"
                                                   onChange={this.onChange}
                                                   checked={orderType === '10'}/> <b
                                            style={{'cursor': 'default'}}> After 10 Minutes </b>
                                        </label>
                                    </div>
                                    <div className="form-check-inline disabled">
                                        <label className="form-check-label">
                                            <input type="radio" name="orderType" value="15"
                                                   className="form-check-input"
                                                   onChange={this.onChange}
                                                   checked={orderType === '15'}/> <b
                                            style={{'cursor': 'default'}}> After 15 Minutes </b>
                                        </label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn addtocartbtn" onClick={this.placeOrder}
                                            disabled={!this.state.visible}> Place Order
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

export default TimeSlotDialog;
