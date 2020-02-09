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
        this.state = {isDialogOpen: false, Loading: true}
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
            if(singleProduct.product.offerPrice !== 0)
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
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                                placeOrder={this.placeOrder} TimeSlots={this.props.TimeSlots}/>}

                {visible ? (
                    <div>
                        <div className="d-flex">
                            <div className="w-75">
                                <div className="d-flex flex-column order_confirm_box">
                                    {this.props.BasketGeneratorProducts.length > 0 && <Collapse accordion>
                                        {this.props.BasketGeneratorProducts.map((singleProduct, index) => (
                                            <Panel header={<div className="orders d-flex justify-content-between m-2 p-2">
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.product.image_url}>
                                                    <img className="img-fluid" alt={singleProduct.product.title}/>
                                                    <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                         alt={singleProduct.product.title}/>
                                                    <img src="/assets/Images/s_loader.gif" className="img-fluid"
                                                         alt={singleProduct.product.title}/>
                                                </ImageLoader>
                                                <p style={{"textTransform": "capitalize"}}>{singleProduct.product.title}</p>
                                                <p>₹ { singleProduct.product.offerPrice !== 0 ? singleProduct.product.offerPrice : singleProduct.product.price}</p>
                                                <p>₹ {singleProduct.product.price}</p>
                                                <button type="button" className="btn btn-danger"
                                                        onClick={() => this.deleteProductFromCart(singleProduct.product.id, singleProduct.teamMember.id)}>Delete
                                                </button>
                                                </div>}
                                                key={index}>

                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.teamMember.image_url}>
                                                    <img className="img-fluid" alt={singleProduct.teamMember.first_name}/>
                                                    <img src="/assets/Images/NoImages.png" className="img-fluid"
                                                         alt={singleProduct.teamMember.first_name}/>
                                                    <img src="/assets/Images/s_loader.gif" className="img-fluid"
                                                         alt={singleProduct.teamMember.first_name}/>
                                                </ImageLoader>
                                                <p style={{"textTransform": "capitalize"}}>{singleProduct.teamMember.first_name + " " + singleProduct.teamMember.last_name}</p>

                                            </Panel>
                                        ))}
                                    </Collapse>}
                                </div>
                            </div>
                            <div className="w-25">
                                <div className="order_total_box d-flex flex-column">
                                    <span>50% OFF Upto  </span>
                                    <span>text</span>
                                    <span>text</span>
                                    <span>text</span>
                                    <span>text</span>
                                </div>
                            </div>
                        </div>


                        <div className="second_part d-flex px-2 mt-2">
                            <div className="d-flex w-75">

                                {this.checkLogin() ? (
                                        <div><span> Sign in or create account Already use Saffron? Sign in with your account. </span>
                                            <Link to="/Login"> <span className="btn btn-default mr-2">Login</span> </Link>
                                            <Link to="/Registration"> <span className="btn btn-primary mr-2">Sing up</span>
                                            </Link></div>) :
                                    <button type="button" className="btn btn-success"
                                            onClick={this.getTimeSlots}> Next </button>
                                }
                            </div>
                            <div className="d-flex justify-content-between sub_total w-25 p-2 mr-2">
                                <h5>Sub Total :&nbsp;</h5>
                                <h5>&#8377; {subTotal} </h5>
                            </div>
                            <div className="d-flex justify-content-between sub_total w-25 p-2 mr-2">
                                <h5>Discount :&nbsp;</h5>
                                <h5>&#8377; {offerPrice} </h5>
                            </div>
                            <div className="d-flex justify-content-between sub_total w-25 p-2 mr-2">
                                <h5>Total :&nbsp;</h5>
                                <h5>&#8377; {totalPrice} </h5>
                            </div>
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