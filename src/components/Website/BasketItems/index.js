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
import Lottie from 'react-lottie';
import * as animationData from './empty-cart';
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
        let visible = false;
        let totalPrice = 0;
        let offerPrice = 0;
        let subTotal = 0;
        this.props.BasketGeneratorProducts.map((singleProduct) => {
            totalPrice += singleProduct.product.price;
            subTotal += singleProduct.product.offerPrice;
            if (singleProduct.product.offerPrice !== 0)
                offerPrice += singleProduct.product.offerPrice - singleProduct.product.price;
            visible = true;
        });

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

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                                placeOrder={this.placeOrder} TimeSlots={this.props.TimeSlots}/>}

                {visible ? (
                    <div>
                        <div className="text-center pandingTimeBox">
                            <span className="panddingText">Your Total Time Panding is</span>
                        </div>
                        <div className="d-flex flex-wrap-reverse">
                            <div className="basketLstPart1">
                                <div className="d-flex flex-column order_confirm_box">
                                    {this.props.BasketGeneratorProducts.length > 0 && <Collapse accordion>
                                        {this.props.BasketGeneratorProducts.map((singleProduct, index) => (
                                            <Panel header={<div
                                                className="orders d-flex justify-content-between align-items-center m-sm-2 p-2">
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.product.image_url}>
                                                    <img className="img-fluid" alt={singleProduct.product.title}/>
                                                    <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                         alt={singleProduct.product.title}/>
                                                    <img src="/assets/Images/s_loader.gif" className="img-fluid"
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
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <ImageLoader
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.teamMember.image_url}>
                                                        <img className="img-fluid"
                                                             alt={singleProduct.teamMember.first_name} style={{
                                                            height: '50px',
                                                            width: '50px',
                                                            borderRadius: '50%'
                                                        }}/>
                                                        <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                             alt={singleProduct.teamMember.first_name}/>
                                                        <img src="/assets/Images/s_loader.gif" className="img-fluid"
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
                            <div className="basketLstPart2">
                                <div className="order_total_box d-flex flex-column">
                                    <span>50% OFF Upto  </span>
                                    <span>text</span>
                                    <span>text</span>
                                    <span>text</span>
                                    <span>text</span>
                                </div>
                            </div>
                        </div>


                        <div
                            className="second_part d-flex flex-sm-nowrap flex-wrap justify-content-between px-2 py-2 w-100">
                            {/*<div className="d-flex my-sm-0 my-2">
                                {this.checkLogin() ? (
                                        <div><span> Sign in or create account Already use Saffron? Sign in with your account. </span>
                                            <Link to="/Login"> <span className="btn btn-default mr-2">Login</span> </Link>
                                            <Link to="/Registration"> <span className="btn btn-primary mr-2">Sing up</span>
                                            </Link></div>) :
                                    <button type="button" className="btn btn-success"
                                            onClick={this.getTimeSlots}> Next </button>
                                }
                            </div>*/}
                            <div className="d-flex flex-column flex-sm-nowrap flex-wrap">
                                <div className="d-flex sub_total">
                                    <h5 className="mr-5">Sub Total:</h5>
                                    <h5>&#8377; {totalPrice} </h5>
                                </div>
                                <div className="d-flex sub_total">
                                    <h5 className="mr-5">Discount:</h5>
                                    <h5>&#8377; {offerPrice} </h5>
                                </div>
                                <div className="d-flex sub_total">
                                    <h5 className="mr-5">Total:</h5>
                                    <h5>Price</h5>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex my-sm-0 my-2">
                            {this.checkLogin() ? (
                                    <div><span> Sign in or create account Already use Saffron? Sign in with your account. </span>
                                        <Link to="/Login"> <span className="btn btn-default mr-2">Login</span> </Link>
                                        <Link to="/Registration"> <span className="btn btn-primary mr-2">Sing up</span>
                                        </Link></div>) :
                                <button type="button" className="btn btn-success"
                                        onClick={this.getTimeSlots}> Next </button>
                            }
                        </div>
                    </div>

                ) : <div>
                    <Lottie options={defaultOptions} height={400} width={400}/>
                    <Link to="/ProductList"><span> Your Booking Cart is Empty.. Continue Shopping </span></Link>
                </div>
                }

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