import React, {Component} from 'react';

import CarIcons from '../DriveThroughIcons/CarIcons';
import MotorcycleIcon from '../DriveThroughIcons/MotorcycleIcon';
import FootIcon from '../DriveThroughIcons/FootIcon';
import BicycleIcon from '../DriveThroughIcons/BicycleIcon';
import BurroIcon from '../DriveThroughIcons/BurroIcon';


export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTicketDialogOpen: false,
            tapped: false
        };
        this.tappedId = null;
    }

    openTicketDialog = () => {

        this.setState({isTicketDialogOpen: true});
    };

    handleReadStatus = (messageStatus) => {
        this.props.handleReadMessage(this.props.requestData.order.orderNumber,this.props.requestData.channels.apiListenChannelName,messageStatus);
    };

    handleChangeTicket = () => {
        this.props.handleChangeTicket(this.props.currentElement);
    };

    handleClose = () => {
        this.setState({isTicketDialogOpen: false});
    };

    handleChangeStatus = () => {
        let action;
        if (this.props.requestData.driveByDetails.deliveryInProgressDateTime) {
            action = 'Delivered'
        }
        else action = 'DeliveryInProgress';
        this.props.updateStatus(this.props.requestData.channels.apiListenChannelName, this.props.requestData.order.customerId, this.props.requestData.order.orderNumber, action);
        this.setState({isTicketDialogOpen: false});
    };

    handleCustomerAction = (action) => {
        if (action === "ComeIn") {
            this.setState({isTicketDialogOpen: false});
        }
        this.props.handleCustomerNotificationStatus(this.props.requestData.channels.apiListenChannelName, this.props.requestData.order.customerId, this.props.requestData.order.orderNumber, action);
    };

    handleCustomerActionForComeIn = (action, reason) => {
        if (action === "ComeIn") {
            this.setState({isTicketDialogOpen: false});
        }
        this.props.handleCustomerNotificationStatusForComeIn(this.props.requestData.channels.apiListenChannelName, this.props.requestData.order.customerId, this.props.requestData.order.orderNumber, action, reason);
    };

    handleTouchStart = () => {
        if (!this.tappedId) {
            let that = this;
            this.tappedId = setTimeout(function () {
                that.tappedId = null;
            }, 300);
        } else {
            clearTimeout(this.tappedId);
            this.tappedId = null;
            this.openTicketDialog();
        }
    };

    render() {
        const {column, status} = this.props;
        const time = this.props.time;
        const pickupTime = this.props.requestData.order.pickUpTime;
        const orderNo = this.props.requestData.order.orderNumber.split("/");
        const modeOfTransport = this.props.requestData.driveByDetails.modeOfTransport.toLowerCase();
        const color = this.props.requestData.driveByDetails.transportColor.toLowerCase() || "#12232d";
        const licensePlateNumber = this.props.requestData.driveByDetails.licensePlateNumber;
        const driveThroughColor = column === "here now" ? this.props.requestData.driveByDetails.tileColor : "#12232d";
        const userAvatar = this.props.requestData.driveByDetails.userAvatar;
        const deliveryInProgressDate = this.props.requestData.driveByDetails.deliveryInProgressDateTime;
        const messageDetails = this.props.requestData.messageDetails;
        let unreadMessagesCount = messageDetails.filter((messages) => !messages.userId && messages.status === false);
        let classes = ['small-box'];
        const transportMode = {
            bicycle: <BicycleIcon color={color}/>,
            car: <CarIcons color={color}/>,
            motorbike: <MotorcycleIcon color={color}/>,
            onfoot: <FootIcon color={color}/>,
            burro: <BurroIcon color={color}/>,
        };
        const transport = transportMode[modeOfTransport];
        if (column === "here now") {
            classes = ['small-box', 'w3-animate-right'];
        } else if (column === "running late") {
            classes = ['small-box', 'w3-animate-left'];
        } else if (column === "on the way") {
            classes = ['small-box', 'w3-animate-top'];
        }
        return (
            <li onClick={this.handleChangeTicket} onDoubleClick={this.openTicketDialog}
                onTouchStart={this.handleTouchStart} style={{cursor: 'pointer'}}>

                <div className={classes.join(' ')}>
                    <audio ref="audio" >
                        <source src="/assets/store_door.mp3" type="audio/mpeg"/>
                    </audio>
                    <div className="waiting-details" style={{backgroundColor: driveThroughColor}}>
                        <div className="drive-status">{status}</div>
                        <div className="pickup-time">{time}</div>
                        <div className="min text-uppercase">min</div>
                    </div>
                    {
                        deliveryInProgressDate ?
                            <div className="status in-progress" style={{backgroundColor: driveThroughColor}}>delivery in
                                progress...
                            </div> : <div className="status pickup">Pick up - {pickupTime}
                            </div>
                    }
                    {unreadMessagesCount.length>0 && <span className="message">{unreadMessagesCount.length}</span>}
                    <div className="box-right">
                        <div className="number">#{orderNo[0]}</div>
                        <div className="icon">{transport}
                            <p className="color">
                                {licensePlateNumber}
                            </p>
                        </div>
                        <div className="image">
                            {userAvatar && <img src={userAvatar} className="img-responsive" alt=""/>}
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    componentDidMount(){
        if(this.props.column!=="running late" && this.props.requestData.isSoundPlay){
            let audio = this.refs.audio;
            audio && audio.play();
        }
    }

    componentWillUnmount(){
        clearTimeout(this.tappedId);
        this.tappedId = null;
    }
}
