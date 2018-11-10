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
    }

    handleChangeTicket = () => {
        this.props.handleChangeTicket(this.props.currentElement);
    };

    render() {
        const {column, status} = this.props;
        const time = "12";
        const pickupTime = "123";
        const orderNo = "1234";
        const modeOfTransport = "car";
        const color = "#12232d";
        const licensePlateNumber = "gj-5";
        let driveThroughColor = "#F3D250";
        if(column === "here now"){
            driveThroughColor = "#61892F";
        }else if(column === "running late"){
            driveThroughColor = "#f76C6C";
        }
        const userAvatar = "";
        const deliveryInProgressDate = "1234";
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
            <li onClick={this.handleChangeTicket} style={{cursor: 'pointer'}}>

                <div className={classes.join(' ')}>
                    <audio ref="audio">
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

    componentDidMount() {
        if (this.props.column !== "running late") {
            let audio = this.refs.audio;
            audio && audio.play();
        }
    }
}
