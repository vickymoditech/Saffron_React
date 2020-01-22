import React, {Component} from 'react';
import {connect} from "react-redux";
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from "redux";
import {Collapse} from 'antd';
import 'antd/dist/antd.css';

let moment = require('moment-timezone');

const {Panel} = Collapse;


class TodayCompleteOrders extends Component {

    componentDidMount() {
        this.props.actions.websiteAction.getCompletedOrder();
    }

    render() {
        return (
            <div>
                <p> User SaffronPoint {this.props.SaffronPoint} </p>
                <div>
                    <Collapse accordion>
                        {this.props.RecentCompleteOrder.map((singleCompletedOrder, index) => (
                            <Panel
                                header={`Order Status ${singleCompletedOrder.column} Total ${singleCompletedOrder.total} BookingDate ${new Date(moment.tz(singleCompletedOrder.bookingDateTime, 'Asia/Kolkata').format())}`}
                                key={index}>
                                <p>{"display order detail"}</p>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        RecentCompleteOrder: websiteReducer.RecentCompleteOrder,
        SaffronPoint: websiteReducer.SaffronPoint
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodayCompleteOrders);