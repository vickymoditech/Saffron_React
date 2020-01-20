import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as websiteAction from "../../../actions/websiteAction";
import TimeSlotDialog from './TimeSlotDialog';
import {browserHistory} from 'react-router';
import './BasketItemsList.css';
import {confirmAlert} from 'react-confirm-alert';
import '../../Admin/Helper/DeleteAlertCss/react-confirm-alert.css';

class BasketItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {isDialogOpen: false}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
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

    placeOrder = (timeSlot) => {
        this.props.actions.websiteAction.placeOrder(timeSlot);
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

    render() {

        let totalPrice = 0;
        this.props.BasketGeneratorProducts.map((singleProduct) => {
            totalPrice += singleProduct.product.price;
        });


        return (
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                                placeOrder={this.placeOrder} TimeSlots={this.props.TimeSlots}/>}

                <table
                    className="table table-bordered">
                    <thead>
                    <tr>
                        <td><strong>Item</strong>
                        </td>
                        <td className="text-center">
                            <strong>Price</strong>
                        </td>
                        <td className="text-center">
                            <strong>Team
                                Member</strong>
                        </td>
                        <td className="text-right">
                            <strong>Totals</strong>
                        </td>
                        <td className="text-right">
                            <strong>DELETE</strong>
                        </td>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.BasketGeneratorProducts.map((singleProduct) => (
                        <tr key={singleProduct.product.id}>
                            <td> {singleProduct.product.title} </td>
                            <td className="text-center">₹ {singleProduct.product.price}</td>
                            <td className="text-center">{singleProduct.teamMember.first_name + " " + singleProduct.teamMember.last_name}</td>
                            <td className="text-right">₹ {singleProduct.product.price}</td>
                            <td className="text-right">
                                <button
                                    onClick={() => this.deleteProductFromCart(singleProduct.product.id, singleProduct.teamMember.id)}> Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                    </tr>
                    <tr>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line text-center">
                            <strong>Subtotal</strong>
                        </td>
                        <td className="thick-line text-right">₹ {totalPrice} </td>
                    </tr>
                    <tr>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="no-line text-center">
                            <strong>Discount</strong>
                        </td>
                        <td className="no-line text-right">₹
                            0
                        </td>
                    </tr>
                    <tr>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="thick-line"></td>
                        <td className="no-line text-center">
                            <strong>Total</strong>
                        </td>
                        <td className="no-line text-right">₹ {totalPrice}</td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={this.getTimeSlots}> Place order</button>

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