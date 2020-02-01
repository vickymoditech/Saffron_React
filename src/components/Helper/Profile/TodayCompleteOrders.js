import React, {Component} from 'react';
import {connect} from "react-redux";
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from "redux";
import {Collapse} from 'antd';
import 'antd/dist/antd.css';
import './TodayCompleteOrderStyle.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';
import * as animationData from "./NoDataFound";
import Lottie from 'react-lottie';

let moment = require('moment-timezone');
const {Panel} = Collapse;


class TodayCompleteOrders extends Component {

    componentDidMount() {
        this.props.actions.websiteAction.getCompletedOrder();
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div>
                <p> User SaffronPoint {this.props.SaffronPoint} </p>
                <div>
                    {this.props.RecentCompleteOrder && this.props.RecentCompleteOrder.length > 0 && <Collapse accordion>
                        {this.props.RecentCompleteOrder.map((singleCompletedOrder, index) => (
                            <Panel
                                header={<div className="main_order_box p-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p>Date
                                            : {moment.tz(singleCompletedOrder.bookingDateTime, 'Asia/Kolkata').format("DD-MM-YYYY HH:mm a")}</p>
                                        <p style={{"textTransform": "capitalize"}} className="status p-2">{singleCompletedOrder.column}</p>
                                    </div>
                                    <p>Total &#8377;. {singleCompletedOrder.total}</p>
                                </div>}
                                key={index}>
                                <div>
                                    <div className="collapse_data p-2">
                                        <div className="text-center">
                                            <h6>Your Arrival
                                                time: {moment.tz(singleCompletedOrder.bookingStartTime, 'Asia/Kolkata').format("DD-MM-YYYY HH:mm a")}</h6>
                                        </div>
                                        <div className="product_box pr-3">
                                            {singleCompletedOrder && singleCompletedOrder.basket.map((singleProduct, index) => (
                                                <div className="d-flex w-100 product p-2 m-2" key={index}>
                                                    <ImageLoader
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.productItem.image_url}>
                                                        <img className="img-fluid"
                                                             alt={singleProduct.productItem.title}/>
                                                        <img src="/assets/Images/NoImages.png"
                                                             className="img-fluid"
                                                             alt={singleProduct.productItem.title}/>
                                                        <img src="/assets/Images/s_loader.gif"
                                                             className="img-fluid"
                                                             alt={singleProduct.productItem.title}/>
                                                    </ImageLoader>

                                                    <div className="w-100 ml-2">
                                                        <h5 style={{"textTransform": "capitalize"}}>{singleProduct.productItem.title}({singleProduct.productItem.sex})</h5>
                                                        <p style={{"textTransform": "capitalize"}}>{singleProduct.productTeam.first_name} {singleProduct.productTeam.last_name}</p>
                                                        <div className="d-flex justify-content-between product_details">
                                                            <p>Price &#8377; {singleProduct.productItem.offerPrice > 0 ? singleProduct.productItem.offerPrice : singleProduct.productItem.price}</p>
                                                            <p>OfferPrice &#8377; {singleProduct.productItem.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                        ))}
                    </Collapse>}
                    {this.props.RecentCompleteOrder && this.props.RecentCompleteOrder.length <= 0 && <div>

                        <Lottie options={defaultOptions} height={400} width={400}/>

                    </div>}
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