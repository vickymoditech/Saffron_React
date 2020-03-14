import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import * as couponAction from '../../../actions/couponAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import AddDialog from './addDialog';
import './manage-coupon.css';
let moment = require('moment-timezone');

class ManageCoupon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            couponList: [],
            notificationSystem: null,
            isDialogOpen: false,
            selectedCoupon: null,
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
        }
        else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.couponAction.DefaultMessageClear();
            this.setState({isDialogOpen: false});
            this.setState({couponList: nextProps.couponList || []});
        } else {
            this.setState({couponList: nextProps.couponList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.couponAction.CouponList();
    }

    removeSpecificService = (CouponId) => {
        confirmAlert({
            key: CouponId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.couponAction.CouponDelete(CouponId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewVideo = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    render() {
        const {couponList} = this.state;
        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen}
                           notify={this.addNotifications} selectedServiceId={this.state.selectedServiceId}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                        <h2 className="text-white"> Manage Coupons </h2>
                        <button type="button" className="w-25 mr-4 button_main2"
                                onClick={this.addNewVideo}>Add New Coupon
                        </button>
                    </div>
                    <div>
                        {couponList.length > 0 && <div className="data-display col-sm-12">
                            <div className="overflow-scroll">
                                <table width="100%" className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{cursor: 'context-menu'}}>Title</th>
                                        <th style={{cursor: 'context-menu'}}>Description</th>
                                        <th style={{cursor: 'context-menu'}}>Percentage</th>
                                        <th style={{cursor: 'context-menu'}}>MinPrice</th>
                                        <th style={{cursor: 'context-menu'}}>MaxPrice</th>
                                        <th style={{cursor: 'context-menu'}}>maxDiscount</th>
                                        <th style={{cursor: 'context-menu'}}>Start Date</th>
                                        <th style={{cursor: 'context-menu'}}>End Date</th>
                                        <th style={{cursor: 'context-menu'}}>Action</th>
                                    </tr>
                                    {couponList && couponList.map((value, index) => (
                                        <tr key={index}>
                                            <td style={{"textTransform": "capitalize"}}>{value.name}</td>
                                            <td style={{"textTransform": "capitalize"}}>{value.info}</td>
                                            <th style={{cursor: 'context-menu'}}>{value.percentage} %</th>
                                            <th style={{cursor: 'context-menu'}}>{value.minPrice}</th>
                                            <th style={{cursor: 'context-menu'}}>{value.maxPrice}</th>
                                            <th style={{cursor: 'context-menu'}}>{value.maxDiscount}</th>
                                            <td style={{"textTransform": "capitalize"}}>{moment.tz(value.startDate, 'Asia/Kolkata').format("DD-MM-YYYY")}</td>
                                            <td style={{"textTransform": "capitalize"}}>{moment.tz(value.endDate, 'Asia/Kolkata').format("DD-MM-YYYY")}</td>
                                            <td style={{textAlign: "center"}}>
                                                <button type="button" className="btn btn-danger" key={value.id}
                                                        onClick={event => {
                                                            this.removeSpecificService(value.id)
                                                        }}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                    </div>
                </div>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageCouponReducer} = state;
    return {
        Loading: manageCouponReducer.Loading,
        error_msg: manageCouponReducer.error_msg,
        couponList: manageCouponReducer.couponList,
        success_msg: manageCouponReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        couponAction: bindActionCreators(couponAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoupon);
