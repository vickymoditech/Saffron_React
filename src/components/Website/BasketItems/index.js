import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as websiteAction from "../../../actions/websiteAction";
import TimeSlotDialog from './TimeSlotDialog';
import {browserHistory} from 'react-router';
import {confirmAlert} from 'react-confirm-alert';
import '../../Admin/Helper/DeleteAlertCss/react-confirm-alert.css';
import {isLoggedIn} from '../../../index';
import {Link} from 'react-router';
import Loader from '../../Helper/Loader';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';
import {Collapse} from 'antd';
import './BasketItemsList.css';
import 'antd/dist/antd.css';

const {Panel} = Collapse;

class BasketItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {isDialogOpen: false, Loading: true};
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.setState({Loading: false});
        }, 1000);
        if (this.props.BasketGeneratorProducts.length > 0) {
            this.props.actions.websiteAction.basketVisible(false);
        } else {
            browserHistory.push('/ProductList');
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({isDialogOpen: nextProps.TimeSlotVisible});
    }

    getTimeSlots = () => {
        this.props.actions.websiteAction.getAllTimeSlots();
    };

    closeDialog = () => {
        this.setState({isDialogOpen: false});
    };

    placeOrder = (timeSlot, orderType) => {
        this.props.actions.websiteAction.placeOrder(timeSlot, orderType);
    };

    deleteProductFromCart = (product_id, teamMember_id) => {

        confirmAlert({
            key: product_id,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.websiteAction.RemoveProductToCart(product_id, teamMember_id);
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    checkLogin = () => {
        if (isLoggedIn())
            return false;
        else
            return true;
    };

    render() {
        const {Loading} = this.state;
        let totalPrice = 0;
        let offerPrice = 0;
        let subTotal = 0;
        this.props.BasketGeneratorProducts.map((singleProduct) => {
            totalPrice += singleProduct.product.price;
            if (singleProduct.product.offerPrice !== 0) {
                subTotal += singleProduct.product.offerPrice;
                offerPrice += singleProduct.product.offerPrice - singleProduct.product.price;
            } else {
                subTotal += singleProduct.product.price;
            }
        });

        return (
            <div style={{paddingTop: '100px', backgroundColor: '#f5f2ea'}}>

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                                placeOrder={this.placeOrder} TimeSlots={this.props.TimeSlots}/>}

                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="d-flex flex-wrap-reverse w-100">
                                <div className="col-md-8">
                                    <h3 className="text-center"> Review your order </h3>
                                    <div className="mt-2 main_review_box">
                                        {this.props.BasketGeneratorProducts.length > 0 && <Collapse accordion>
                                            {this.props.BasketGeneratorProducts.map((singleProduct, index) => (
                                                <Panel header={<div
                                                    className="orders d-flex justify-content-between align-items-center m-sm-2 p-2">
                                                    <ImageLoader
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.product.image_url}>
                                                        <img className="img-fluid"
                                                             style={{height: '80px', width: '100px'}}
                                                             alt={singleProduct.product.title}/>
                                                        <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                             style={{height: '80px', width: '100px'}}
                                                             alt={singleProduct.product.title}/>
                                                        <img src="/assets/Images/s_loader.gif" className="img-fluid"
                                                             style={{height: '80px', width: '100px'}}
                                                             alt={singleProduct.product.title}/>
                                                    </ImageLoader>
                                                    <p style={{"textTransform": "capitalize"}}>{singleProduct.product.title}</p>
                                                    <p>₹ {singleProduct.product.offerPrice !== 0 ? singleProduct.product.offerPrice : singleProduct.product.price}</p>
                                                    <p>₹ {singleProduct.product.price}</p>
                                                    <button type="button" className="btn btn-danger"
                                                            onClick={() => this.deleteProductFromCart(singleProduct.product.id, singleProduct.teamMember.id)}>Delete
                                                    </button>
                                                </div>}
                                                       key={index}>
                                                    <div
                                                        className="d-flex justify-content-center align-items-center">
                                                        <ImageLoader
                                                            src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.teamMember.image_url}>
                                                            <img className="img-fluid"
                                                                 style={{
                                                                     height: '50px',
                                                                     width: '50px',
                                                                     borderRadius: '50%'
                                                                 }}
                                                                 alt={singleProduct.teamMember.first_name}
                                                            />
                                                            <img src="/assets/Images/NoImages.png"
                                                                 className="img-fluid"
                                                                 style={{
                                                                     height: '50px',
                                                                     width: '50px',
                                                                     borderRadius: '50%'
                                                                 }}
                                                                 alt={singleProduct.teamMember.first_name}/>
                                                            <img src="/assets/Images/s_loader.gif"
                                                                 className="img-fluid"
                                                                 style={{
                                                                     height: '50px',
                                                                     width: '50px',
                                                                     borderRadius: '50%'
                                                                 }}
                                                                 alt={singleProduct.teamMember.first_name}/>
                                                        </ImageLoader>
                                                        <p style={{
                                                            textTransform: "capitalize",
                                                            marginLeft: '10px'
                                                        }}>{singleProduct.teamMember.first_name + " " + singleProduct.teamMember.last_name}</p>
                                                    </div>
                                                </Panel>
                                            ))}
                                        </Collapse>}
                                    </div>
                                </div>
                                <div className="col-md-4 pl-sm-0">
                                    <div className="col-md-12 main_discount_order_box overflow-hidden h-100">
                                        <h3 className="text-center"> Coupons </h3>
                                        <div className="discount_box p-2 h-100">
                                            <div className="d-flex flex-column border border-dark p-2">
                                                    <span
                                                        className="discount_value">Your Savings: &#8377;2,000 (18%)</span>
                                                <span>Item Discount</span>
                                            </div>
                                            <div className="d-flex flex-column border border-dark p-2">
                                                    <span
                                                        className="discount_value">Your Savings: &#8377;2,000 (18%)</span>
                                                <span>Item Discount</span>
                                            </div>
                                            <div className="d-flex flex-column border border-dark p-2">
                                                    <span
                                                        className="discount_value">Your Savings: &#8377;2,000 (18%)</span>
                                                <span>Item Discount</span>
                                            </div>
                                            <div className="d-flex flex-column border border-dark p-2">
                                                    <span
                                                        className="discount_value">Your Savings: &#8377;2,000 (18%)</span>
                                                <span>Item Discount</span>
                                            </div>
                                            <div className="d-flex flex-column border border-dark p-2">
                                                    <span
                                                        className="discount_value">Your Savings: &#8377;2,000 (18%)</span>
                                                <span>Item Discount</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap-reverse w-100">
                                {this.checkLogin() ? (<div className="col-md-8">
                                        <div
                                            className="text-center d-flex flex-column justify-content-center h-100 mt-3">
                                            <p className="signinOrCreate">Sign in or create account Already use Saffron?
                                                Sign in with your
                                                account.</p>
                                            <div className="d-flex justify-content-center">
                                                <Link to="/Login"><p className="loginBtn btn button_main mr-3">Login</p>
                                                </Link>
                                                <Link to="/Registration"><p className="loginBtn btn button_main">Sing
                                                    up</p></Link>
                                            </div>
                                        </div>
                                    </div>) :
                                    <div className="col-md-8 d-flex align-items-center justify-content-center">
                                        <button className="btn button_main mt-4 w-50" type="button"
                                                onClick={this.getTimeSlots}>
                                            Choose your time slot
                                        </button>
                                    </div>}
                                <div className="col-md-4 pl-sm-0">
                                    <div className="mt-3">
                                        <div
                                            className="sub_total_box1 d-flex justify-content-between border border-dark p-2">
                                            <span>Sub Total</span>
                                            <span>&#8377; {subTotal}</span>
                                        </div>
                                        <div
                                            className="sub_total_box1 d-flex justify-content-between border border-dark p-2 mt-2">
                                            <span>Discount</span>
                                            <span>&#8377; {offerPrice}</span>
                                        </div>
                                        <div
                                            className="sub_total_box1 d-flex justify-content-between border border-dark p-2 mt-2">
                                            <span>Coupon</span>
                                            <span>&#8377; {0}</span>
                                        </div>
                                        <div
                                            className="sub_total_box1 d-flex justify-content-between border border-dark p-2 mt-2">
                                            <span>Total</span>
                                            <span>&#8377; {totalPrice}</span>
                                        </div>
                                        <div className="d-flex justify-content-between px-2 mt-2">
                                            <input type="text"
                                                   className="form-control w-100 border border-dark mb-0 mr-2"/>
                                            <button type="button" className="btn button_main">Check</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center w-100 my-3">
                            </div>
                        </div>
                    </div>
                </div>
                {Loading && <Loader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        BasketGeneratorProducts: websiteReducer.BasketGeneratorProducts,
        TimeSlots: websiteReducer.TimeSlots,
        TimeSlotVisible: websiteReducer.TimeSlotVisible
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItemsList);
