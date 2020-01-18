import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import * as websiteAction from "../../../actions/websiteAction";
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import TimeSlotDialog from './TimeSlotDialog';
import './BasketItemsList.css';

class BasketItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {isDialogOpen: false}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    };

    openDialog = () => {
        this.setState({isDialogOpen: true});
    };

    closeDialog = () => {
        this.setState({isDialogOpen: false});
    };

    render() {
        return (
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                           notify={this.addNotifications}/>}

                <button onClick={this.openDialog}> Place order</button>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        BasketGeneratorProducts: websiteReducer.BasketGeneratorProducts,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItemsList);