import React, {Component} from 'react';
import {Dialog} from 'material-ui';

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
        this.state = {selectedTime: null};
    }

    TimeSelectedClick = (selectedTime) => {
        this.setState({selectedTime: selectedTime});
    };

    placeOrder = () => {
        this.props.placeOrder(this.state.selectedTime);
    };

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
                                <div> Time slot example</div>
                                {this.props.TimeSlots.map((singleData) => (
                                    <button key={singleData.id} onClick={() => this.TimeSelectedClick({
                                        start_time: singleData.start_time,
                                        end_time: singleData.end_time
                                    })}>
                                        <div> startTime:{singleData.start_time} </div>
                                        <div> EndTime:{singleData.end_time} </div>
                                    </button>
                                ))}
                                {this.state.selectedTime && <button onClick={this.placeOrder}> Place Order</button>}
                                <button onClick={this.props.handleClose}> close</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default TimeSlotDialog;
