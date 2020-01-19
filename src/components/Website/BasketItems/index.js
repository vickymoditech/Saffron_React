import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as websiteAction from "../../../actions/websiteAction";
import TimeSlotDialog from './TimeSlotDialog';
import {browserHistory, Link} from 'react-router';
import './BasketItemsList.css';

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


    render() {
        return (
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                                placeOrder={this.placeOrder}
                                notify={this.addNotifications} TimeSlots={this.props.TimeSlots}/>}

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