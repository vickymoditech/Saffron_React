import React, {Component} from 'react';
import {connect} from "react-redux";
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from "redux";
import {Collapse} from 'antd';
import 'antd/dist/antd.css';
import './TodayCompleteOrderStyle.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';

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
                        {this.props.RecentCompleteOrder && this.props.RecentCompleteOrder.map((singleCompletedOrder, index) => (
                            <Panel
                                header={<div className="main_order_box p-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p>Date
                                            : {moment.tz(singleCompletedOrder.bookingDateTime, 'Asia/Kolkata').format("DD-MM-YYYY HH:mm a")}</p>
                                        <p className="status p-2">{singleCompletedOrder.column}</p>
                                    </div>
                                    <p>Price:&#8377;{singleCompletedOrder.total}</p>
                                </div>}
                                key={index}>
                                <div>
                                    <div className="collapse_data p-2">
                                        <div className="text-center">
                                            <p>Your Arrival time: {moment.tz(singleCompletedOrder.bookingStartTime, 'Asia/Kolkata').format("DD-MM-YYYY HH:mm a")}</p>
                                        </div>
                                        <div className="product_box pr-3">
                                            {singleCompletedOrder && singleCompletedOrder.basket.map((singleProduct) => (
                                                <div className="d-flex w-100 product p-2 m-2">

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
                                                        <h5 style={{"textTransform": "capitalize"}}>{singleProduct.productItem.title}</h5>
                                                        <div className="d-flex justify-content-between product_details">
                                                            <p>Price &#8377; {singleProduct.productItem.offerPrice > 0 ? singleProduct.productItem.offerPrice : singleProduct.productItem.price}</p>
                                                            <p>OfferPrice &#8377; {singleProduct.productItem.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/*<p> {`Your arrival time ${  }`} </p>*/}
                                    {/*<table*/}
                                    {/*className="table table-bordered">*/}
                                    {/*<thead>*/}
                                    {/*<tr>*/}
                                    {/*<td><strong>Item</strong>*/}
                                    {/*</td>*/}
                                    {/*<td className="text-center">*/}
                                    {/*<strong>Price</strong>*/}
                                    {/*</td>*/}
                                    {/*<td className="text-center">*/}
                                    {/*<strong>Team*/}
                                    {/*Member</strong>*/}
                                    {/*</td>*/}
                                    {/*<td className="text-right">*/}
                                    {/*<strong>Offer Price</strong>*/}
                                    {/*</td>*/}
                                    {/*</tr>*/}
                                    {/*</thead>*/}
                                    {/*<tbody>*/}

                                    {/*{singleCompletedOrder && singleCompletedOrder.basket.map((singleProduct) => (*/}
                                    {/*<tr key={singleProduct.productItem.id}>*/}
                                    {/*<td style={{"textTransform": "capitalize"}}> {singleProduct.productItem.title} </td>*/}
                                    {/*<td className="text-center">₹ {singleProduct.productItem.offerPrice > 0 ? singleProduct.productItem.offerPrice : singleProduct.productItem.price}</td>*/}
                                    {/*<td className="text-center"*/}
                                    {/*style={{"textTransform": "capitalize"}}>{singleProduct.productTeam.first_name + " " + singleProduct.productTeam.last_name}</td>*/}
                                    {/*<td className="text-right">₹ {singleProduct.productItem.price}</td>*/}
                                    {/*</tr>*/}
                                    {/*))}*/}

                                    {/*<tr>*/}
                                    {/*<td className="thick-line"/>*/}
                                    {/*<td className="thick-line"/>*/}
                                    {/*<td className="thick-line"/>*/}
                                    {/*<td className="thick-line"/>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*<td className="thick-line"/>*/}
                                    {/*<td className="thick-line"/>*/}
                                    {/*<td className="no-line text-right">*/}
                                    {/*<strong>Total</strong>*/}
                                    {/*</td>*/}
                                    {/*<td className="thick-line text-right">₹ {singleCompletedOrder.total} </td>*/}
                                    {/*</tr>*/}
                                    {/*</tbody>*/}
                                    {/*</table>*/}
                                </div>
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