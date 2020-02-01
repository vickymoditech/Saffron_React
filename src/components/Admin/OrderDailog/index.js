import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as saffronOrderDisplayAction from '../../../actions/saffronOrdersDisplayAction';
import {GetLocalUderData} from '../../../index';
import './OrderDailogStyle.css';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    },
    actionsContainerStyle: {
        textAlign: 'right',
        padding: '5 5'
    },
    leftCloseButton: {
        borderRadius: '50%',
        boxShadow: '0px 2px 9px -2px #000',
        float: 'right',
        backgroundColor: '#fff',
        width: 43,
        height: 43,
        fontSize: 25,
        fontFamily: 'FontAwesome',
        color: '#c53140',
        marginTop: '-6px',
        padding: "9px 12px"
    }
};

class OrderDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            column: props.column,
            order: props.order,
            role: GetLocalUderData().user.role,
            teamMemberId: GetLocalUderData().user.id,
            itemsList: GetLocalUderData().user.role.toLowerCase() !== "admin" ? props.order.teamWiseProductList.find((data) => data.id === GetLocalUderData().user.id) : []
        };
    }

    handleMoveToProgress = () => {
        this.props.actions.saffronOrderDisplayAction.orderStatusUpdateRequest(this.state.order.id, this.state.teamMemberId, this.state.column);
        this.props.handleClose();
    };

    handleDone = () => {
        this.props.actions.saffronOrderDisplayAction.orderStatusUpdateRequest(this.state.order.id, this.state.teamMemberId, 'finish');
        this.props.handleClose();
    };

    handleFinishPayment = () => {
        this.props.actions.saffronOrderDisplayAction.orderStatusPaymentUpdateRequest(this.state.order.id, 'payment finish');
        this.props.handleClose();
    };

    render() {
        const {order} = this.state;
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.state.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div style={{"width": "100%"}} className="main_box">
                                    <h5 className="text-center my-2">{order.customerName} ({order.customer_id})</h5>
                                    {this.state.role.toLowerCase() === "admin" ? <div>
                                        <div className="d-flex justify-content-between p-3">
                                            <h5>Product</h5>
                                            <h5>Team</h5>
                                            <h5>Price</h5>
                                        </div>
                                        <div className="data p-2">
                                            {this.state.order.basket.map((singleProduct) => (
                                                <div key={singleProduct.productItem.id}
                                                     className="d-flex justify-content-between align-items-center main_row p-2 mb-3">
                                                    <span
                                                        style={{"textTransform": "capitalize"}}>{singleProduct.productItem.title}</span>
                                                    <span
                                                        style={{"textTransform": "capitalize"}}>{singleProduct.productTeam.first_name + " " + singleProduct.productTeam.last_name}</span>
                                                    <span>&#8377; {singleProduct.productItem.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div> : <div>
                                        <div className="d-flex justify-content-between p-2">
                                            <h5>Product</h5>
                                            <h5>Price</h5>
                                        </div>
                                        <div className="data p-2">
                                            {this.state.itemsList.productList.map((singleProduct) => (
                                                <div key={singleProduct.id}
                                                     className="d-flex justify-content-between align-items-center main_row p-2 mb-3">
                                                    <span
                                                        style={{"textTransform": "capitalize"}}>{singleProduct.title}</span>
                                                    <span>&#8377; {singleProduct.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>}
                                    <div className="d-flex justify-content-center btns">
                                        {this.state.role.toLowerCase() !== "admin" && (this.state.column && (this.state.column === "running late" || this.state.column === "recent orders") ?
                                            < button type="button"
                                                     style={{
                                                         padding: '10px',
                                                         marginRight: '10px',
                                                         borderRadius: '5px',
                                                         border: '0px',
                                                         backgroundColor: '#bf925d',
                                                         color: '#000000'
                                                     }}
                                                     onClick={this.handleMoveToProgress}>Move to
                                                Progress
                                            </button> :
                                            !(this.state.column === "finish") &&
                                            < button type="button" className="btn btn-save"
                                                     style={{margin: '12px 10px 0 0'}}
                                                     onClick={this.handleDone}>Finish
                                            </button>)}
                                        <button type="button"
                                                style={{
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    border: '0px',
                                                    backgroundColor: '#bf925d',
                                                    color: '#000000'
                                                }}
                                                onClick={this.props.handleClose}>Close
                                        </button>
                                        {(this.state.role.toLowerCase() === "admin" && (this.state.column && this.state.column === "finish" && !(order.paymentComplete))) &&
                                        < button type="button" className="btn btn-save"
                                                 style={{margin: '12px 10px 0 0'}}
                                                 onClick={this.handleFinishPayment}>Finish Payment
                                        </button>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        saffronOrderDisplayAction: bindActionCreators(saffronOrderDisplayAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(OrderDialog);
