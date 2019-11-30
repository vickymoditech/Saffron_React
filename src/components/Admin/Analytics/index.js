import React, {Component} from 'react';
import './analytics.css';
import AverageWaitTimeReport from './AverageWaitTimeReport';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as analyticsAction from '../../../actions/analyticsAction';

class Analytics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
            this.props.actions.serviceAction.DefaultMessageClear();
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.serviceAction.DefaultMessageClear();
        }
    }

    componentWillMount() {
        this.props.actions.analyticsAction.GetAnalyticsRecords();
    };

    render() {
        return (
            <div>
                <div className="dashboard-main">
                    <AverageWaitTimeReport loading={this.props.Loading}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {manageAnalyticsReducer} = state;
    return {
        Loading: manageAnalyticsReducer.Loading,
        error_msg: manageAnalyticsReducer.error_msg,
        topUsers: manageAnalyticsReducer.topUsers,
        getTotalBillablePrice: manageAnalyticsReducer.getTotalBillablePrice,
        getOrderStatusReport: manageAnalyticsReducer.getOrderStatusReport,
        getTeamWiseOrderStatusReport: manageAnalyticsReducer.getTeamWiseOrderStatusReport,
        success_msg: manageAnalyticsReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        analyticsAction: bindActionCreators(analyticsAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
