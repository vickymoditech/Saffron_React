import React, {Component} from 'react';
import './InvoiceStyle.css';
import {connect} from "react-redux";
import {Collapse} from 'antd';
import 'antd/dist/antd.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';
import {Link} from 'react-router';
import Lottie from 'react-lottie';
import * as animationData from './empty-cart';

const {Panel} = Collapse;

class Invoice extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        let totalPrice = 0;
        let offerPrice = 0;
        let subTotal = 0;

        if (this.props.RecentOrder) {
            totalPrice = this.props.RecentOrder.orderPlace.total;
            this.props.RecentOrder.orderPlace.productList.map((singleProduct) => {
                if (singleProduct.productItem.offerPrice !== 0) {
                    subTotal += singleProduct.productItem.offerPrice;
                } else {
                    subTotal += singleProduct.productItem.price;
                }
            });
            offerPrice = subTotal - totalPrice;
        }

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div style={{paddingTop: '100px', backgroundColor: '#f5f2ea'}}>
                {this.props.RecentOrder ? (<div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="d-flex message_box p-3 justify-content-center w-50 mx-auto border border-dark">
                                <i className="fa fa-info-circle pt-1 pl-3"></i>
                                <div className="pl-3">
                                    <span>Import Message</span>
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="mt-2 main_review_box">
                                {this.props.RecentOrder.orderPlace.productList.length > 0 && (<Collapse accordion>
                                    {this.props.RecentOrder.orderPlace.productList.map((singleProduct, index) => (
                                        <Panel header={<div
                                            className="orders d-flex justify-content-between align-items-center m-sm-2 p-2">
                                            <ImageLoader
                                                src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.productItem.image_url}>
                                                <img className="img-fluid"
                                                     style={{height: '80px', width: '100px'}}
                                                     alt={singleProduct.productItem.title}/>
                                                <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                     style={{height: '80px', width: '100px'}}
                                                     alt={singleProduct.productItem.title}/>
                                                <img src="/assets/Images/s_loader.gif" className="img-fluid"
                                                     style={{height: '80px', width: '100px'}}
                                                     alt={singleProduct.productItem.title}/>
                                            </ImageLoader>
                                            <p style={{"textTransform": "capitalize"}}>{singleProduct.productItem.title}</p>
                                            <p>₹ {singleProduct.productItem.offerPrice !== 0 ? singleProduct.productItem.offerPrice : singleProduct.productItem.price}</p>
                                            <p>₹ {singleProduct.productItem.price}</p>
                                        </div>}
                                               key={index}>
                                            <div
                                                className="d-flex justify-content-center align-items-center">
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.productTeam.image_url}>
                                                    <img className="img-fluid"
                                                         style={{
                                                             height: '50px',
                                                             width: '50px',
                                                             borderRadius: '50%'
                                                         }}
                                                         alt={singleProduct.productTeam.first_name}
                                                    />
                                                    <img src="/assets/Images/NoImages.png"
                                                         className="img-fluid"
                                                         style={{
                                                             height: '50px',
                                                             width: '50px',
                                                             borderRadius: '50%'
                                                         }}
                                                         alt={singleProduct.productTeam.first_name}/>
                                                    <img src="/assets/Images/s_loader.gif"
                                                         className="img-fluid"
                                                         style={{
                                                             height: '50px',
                                                             width: '50px',
                                                             borderRadius: '50%'
                                                         }}
                                                         alt={singleProduct.productTeam.first_name}/>
                                                </ImageLoader>
                                                <p style={{
                                                    textTransform: "capitalize",
                                                    marginLeft: '10px'
                                                }}>{singleProduct.productTeam.first_name + " " + singleProduct.productTeam.last_name}</p>
                                            </div>
                                        </Panel>
                                    ))}
                                </Collapse>)}
                            </div>
                        </div>
                        <div className="col-sm-3 pl-sm-0">
                            <div className="mt-3">
                                <div
                                    className="sub_total_box d-flex justify-content-between border border-dark p-2 mt-2">
                                    <span>Sub Total</span>
                                    <span>&#8377; {subTotal}</span>
                                </div>
                                <div
                                    className="sub_total_box d-flex justify-content-between border border-dark p-2 mt-2">
                                    <span>Discount</span>
                                    <span>&#8377; {offerPrice}</span>
                                </div>
                                <div
                                    className="sub_total_box d-flex justify-content-between border border-dark p-2 mt-2">
                                    <span>Total</span>
                                    <span>&#8377; {totalPrice}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div
                                className="d-flex message_box pt-2 mt-2 justify-content-center w-50 mx-auto border border-dark">
                                <i className="fa fa-info-circle pt-1 pl-3"></i>
                                <div className="pl-3">
                                    <span>Import Message</span>
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : <div>
                    <Lottie options={defaultOptions} height={400} width={400}/>
                </div>}
                <div className="text-center">
                    <Link className="shopingBtn loginBtn btn button_main mb-3" to="/ProductList"><p> Continue Shopping </p></Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        RecentOrder: websiteReducer.RecentOrder
    };
};

export default connect(mapStateToProps, null)(Invoice);
